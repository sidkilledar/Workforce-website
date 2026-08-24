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
  await user.type(screen.getByLabelText(/^company \*$/i), "Rivera Restaurant Group");
  await user.type(screen.getByLabelText(/role or job title/i), "Director of Operations");
  await user.type(screen.getByLabelText(/systems currently involved/i), "Scheduling, POS, and team chat");
  await user.click(screen.getByLabelText(/i agree to be contacted/i));
}

describe("DemoForm", () => {
  it("shows validation errors when submitted empty", async () => {
    const user = userEvent.setup();
    render(<DemoForm />);

    await user.click(screen.getByRole("button", { name: /request a demo/i }));

    expect(await screen.findByText(/enter your full name/i)).toBeInTheDocument();
    expect(screen.getByText(/enter your work email/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("submits valid data and shows a success state", async () => {
    const user = userEvent.setup();
    render(<DemoForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /request a demo/i }));

    await waitFor(() => {
      expect(screen.getByText(/request received/i)).toBeInTheDocument();
    });
    expect(fetch).toHaveBeenCalledWith(
      "/api/demo",
      expect.objectContaining({ method: "POST" }),
    );
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
    await user.click(screen.getByRole("button", { name: /request a demo/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /couldn't send your request/i,
    );
  });

  it("focuses the first invalid field after a failed validation", async () => {
    const user = userEvent.setup();
    render(<DemoForm />);

    await user.click(screen.getByRole("button", { name: /request a demo/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/full name/i)).toHaveFocus();
    });
  });

  it("focuses the confirmation heading on success", async () => {
    const user = userEvent.setup();
    render(<DemoForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /request a demo/i }));

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /request received/i })).toHaveFocus();
    });
  });

  it("returns to an empty form after choosing to submit another request", async () => {
    const user = userEvent.setup();
    render(<DemoForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /request a demo/i }));

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /request received/i })).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: /submit another request/i }));

    expect(screen.getByLabelText(/full name/i)).toHaveValue("");
  });
});
