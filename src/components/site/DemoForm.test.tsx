import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DemoForm } from "@/components/site/DemoForm";

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ status: "success" }),
    }),
  );
});

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/full name/i), "Jamie Rivera");
  await user.type(screen.getByLabelText(/work email/i), "jamie@example.com");
  await user.type(screen.getByLabelText(/^organization \*$/i), "Rivera Restaurant Group");
  await user.selectOptions(screen.getByLabelText(/organization type/i), "restaurant-groups");
  await user.type(
    screen.getByLabelText(/what would you like straw to help with/i),
    "Shift swaps and daily handoffs across our cafés.",
  );
  await user.click(screen.getByLabelText(/i agree to be contacted/i));
}

describe("DemoForm", () => {
  it("keeps qualification collapsed and reveals it on request", async () => {
    const user = userEvent.setup();
    render(<DemoForm />);
    const context = screen.getByText("Add more context").closest("details");
    expect(context).not.toHaveAttribute("open");
    await user.click(screen.getByText("Add more context"));
    expect(context).toHaveAttribute("open");
    expect(screen.getByLabelText(/role or job title/i)).toBeVisible();
  });

  it("prevents duplicate submission while delivery is pending", async () => {
    vi.stubGlobal("fetch", vi.fn(() => new Promise(() => {})));
    const user = userEvent.setup();
    render(<DemoForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send context/i }));
    expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("reveals and focuses invalid optional context returned by the server", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false, status: 400,
      json: async () => ({ message: "Review your details.", fieldErrors: { role: "Role is too long." } }),
    }));
    const user = userEvent.setup();
    render(<DemoForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send context/i }));
    await waitFor(() => expect(screen.getByLabelText(/role or job title/i)).toHaveFocus());
    expect(screen.getByText("Add more context").closest("details")).toHaveAttribute("open");
  });

  it("shows validation errors when submitted empty", async () => {
    const user = userEvent.setup();
    render(<DemoForm />);

    await user.click(screen.getByRole("button", { name: /send context/i }));

    expect(await screen.findByText(/enter your full name/i)).toBeInTheDocument();
    expect(screen.getByText(/enter your work email/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("submits valid data and shows a success state", async () => {
    const user = userEvent.setup();
    render(<DemoForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send context/i }));

    await waitFor(() => {
      expect(screen.getByText(/request received/i)).toBeInTheDocument();
    });
    expect(fetch).toHaveBeenCalledWith(
      "/api/demo",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("exposes the calendar link after success when a booking URL is configured", async () => {
    const user = userEvent.setup();
    render(<DemoForm bookingUrl="https://cal.example.com/straw" />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send context/i }));

    const link = await screen.findByRole("link", { name: "Choose a meeting time" });
    expect(link).toHaveAttribute("href", "https://cal.example.com/straw");
    expect(screen.getByText(/your context has been sent\. choose a meeting time to complete your booking\./i)).toBeInTheDocument();
    expect(link.getAttribute("href")).not.toMatch(/jamie|example\.com\/straw\?/i);
  });

  it("shows request receipt only, with no calendar link, when no booking URL is set", async () => {
    const user = userEvent.setup();
    render(<DemoForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send context/i }));

    expect(await screen.findByRole("heading", { name: /request received/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /choose a meeting time/i })).not.toBeInTheDocument();
    expect(screen.getByText(/not a booked appointment/i)).toBeInTheDocument();
  });

  it("allows retry after a failed submission", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: false, status: 502, json: async () => ({ message: "We couldn't send your request." }) })
      .mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ status: "success" }) });
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<DemoForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send context/i }));
    expect(await screen.findByRole("alert")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /send context/i }));
    expect(await screen.findByRole("heading", { name: /request received/i })).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("shows a server error message when the request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 502,
        json: async () => ({ status: "error", message: "We couldn't send your request." }),
      }),
    );

    const user = userEvent.setup();
    render(<DemoForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send context/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /couldn't send your request/i,
    );
  });

  it("focuses the first invalid field after a failed validation", async () => {
    const user = userEvent.setup();
    render(<DemoForm />);

    await user.click(screen.getByRole("button", { name: /send context/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/full name/i)).toHaveFocus();
    });
  });

  it("focuses the confirmation heading on success", async () => {
    const user = userEvent.setup();
    render(<DemoForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send context/i }));

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /request received/i })).toHaveFocus();
    });
  });

  it("returns to an empty form after choosing to submit another request", async () => {
    const user = userEvent.setup();
    render(<DemoForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send context/i }));

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /request received/i })).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: /submit another request/i }));

    expect(screen.getByLabelText(/full name/i)).toHaveValue("");
  });
});
