"use client";

import type { ReactNode } from "react";
import { useRegisterModal } from "@/components/register-modal";

type RegisterButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function RegisterButton({
  children,
  variant = "secondary",
  className = "",
}: RegisterButtonProps) {
  const { open } = useRegisterModal();
  const variantClass =
    variant === "primary"
      ? "luxury-button luxury-button-primary"
      : "luxury-button luxury-button-secondary";

  return (
    <button type="button" onClick={open} className={`${variantClass} ${className}`.trim()}>
      {children}
    </button>
  );
}
