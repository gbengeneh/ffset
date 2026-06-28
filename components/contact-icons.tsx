import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.3" cy="6.7" r="0.8" fill="currentColor" stroke="none" />
    </BaseIcon>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M14.5 7.2h-1.8c-1.3 0-2.2.9-2.2 2.4v2h4l-.5 3h-3.5v6" />
      <path d="M12 21c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9Z" />
    </BaseIcon>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M20 11.7c0 4.5-3.7 8.3-8.3 8.3-1.4 0-2.7-.3-3.9-1l-4 1 1.1-3.8A8.3 8.3 0 1 1 20 11.7Z" />
      <path d="M9.2 8.7c.2-.5.4-.5.7-.5h.6c.2 0 .5 0 .7.5l.8 1.9c.1.3.1.5-.1.7l-.6.8c-.1.1-.2.3 0 .5.4.7 1.2 1.7 2.6 2.4.2.1.4.1.5 0l.9-.6c.2-.2.4-.2.7-.1l1.8.8c.5.2.5.4.5.7v.6c0 .3-.2.5-.5.7-.5.2-1.1.4-1.8.2-1-.2-2.3-.7-3.8-2.2-1.8-1.7-2.5-3.3-2.8-4.4-.2-.6 0-1.2.2-1.6Z" />
    </BaseIcon>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M6.9 4.7c.4-.4 1-.5 1.5-.2l2 1c.6.3.8 1 .6 1.6l-.8 1.8c-.1.3-.1.6.1.8 1 1.9 2.5 3.4 4.4 4.4.2.2.5.2.8.1l1.8-.8c.6-.3 1.3 0 1.6.6l1 2c.3.5.2 1.1-.2 1.5l-1.2 1.2c-.8.8-2 1.1-3.1.8-2.2-.6-5.2-2.2-8-5S4.5 9.8 3.9 7.6c-.3-1.1 0-2.3.8-3.1l1.2-1.2Z" />
    </BaseIcon>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m5 7 7 5 7-5" />
    </BaseIcon>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 20s6-4.8 6-10a6 6 0 1 0-12 0c0 5.2 6 10 6 10Z" />
      <circle cx="12" cy="10" r="2.2" />
    </BaseIcon>
  );
}
