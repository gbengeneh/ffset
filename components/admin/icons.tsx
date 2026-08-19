import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps) {
  return {
    "aria-hidden": true,
    viewBox: "0 0 20 20",
    width: "1em",
    height: "1em",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

export function CarsIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 12.5 4.4 8a1.6 1.6 0 0 1 1.5-1h8.2a1.6 1.6 0 0 1 1.5 1l1.4 4.5" />
      <rect x="2.2" y="12.5" width="15.6" height="4" rx="1.2" />
      <circle cx="6" cy="16.5" r="1.2" />
      <circle cx="14" cy="16.5" r="1.2" />
    </svg>
  );
}

export function CarOrdersIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 12.5 4.4 8a1.6 1.6 0 0 1 1.5-1h8.2a1.6 1.6 0 0 1 1.5 1l1.4 4.5" />
      <rect x="2.2" y="12.5" width="15.6" height="4" rx="1.2" />
      <circle cx="6" cy="16.5" r="1.2" />
      <circle cx="14" cy="16.5" r="1.2" />
      <path d="m13.5 3.5 1.3 1.3L17.5 2" />
    </svg>
  );
}

export function DashboardIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="6" height="6" rx="1.4" />
      <rect x="11" y="3" width="6" height="6" rx="1.4" />
      <rect x="3" y="11" width="6" height="6" rx="1.4" />
      <rect x="11" y="11" width="6" height="6" rx="1.4" />
    </svg>
  );
}

export function ProductsIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3.5 6.2 10 3l6.5 3.2v7.6L10 17l-6.5-3.2z" />
      <path d="M3.5 6.2 10 9.4l6.5-3.2" />
      <path d="M10 9.4V17" />
    </svg>
  );
}

export function EventsIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="4" width="14" height="13" rx="1.6" />
      <path d="M3 8h14" />
      <path d="M6.5 2.5v3" />
      <path d="M13.5 2.5v3" />
    </svg>
  );
}

export function CompetitionsIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 4h8v3.2a4 4 0 0 1-8 0Z" />
      <path d="M6 5H3.8A2 2 0 0 0 4.5 8.6L6 9.6" />
      <path d="M14 5h2.2a2 2 0 0 1-.7 3.6L14 9.6" />
      <path d="M10 11.2V14" />
      <path d="M7 17h6" />
      <path d="M8.5 14h3l.5 3h-4z" />
    </svg>
  );
}

export function RegistrationsIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="7.2" cy="6.8" r="2.3" />
      <path d="M2.8 16c.6-2.8 2.3-4.3 4.4-4.3s3.8 1.5 4.4 4.3" />
      <circle cx="14.2" cy="7.4" r="1.9" />
      <path d="M12.6 11.9c1.8.1 3.1 1.5 3.6 4.1" />
    </svg>
  );
}

export function OrdersIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 4h1.5l1.2 8.4a1.5 1.5 0 0 0 1.49 1.3h6.62a1.5 1.5 0 0 0 1.48-1.24L16.5 7H5" />
      <circle cx="8" cy="16.5" r="1" />
      <circle cx="14" cy="16.5" r="1" />
    </svg>
  );
}

export function BookingsIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="10" cy="10.5" r="6.5" />
      <path d="M10 7v3.5l2.4 1.4" />
      <path d="M7.5 2.5h5" />
    </svg>
  );
}

export function GalleryIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="4" width="14" height="12" rx="1.6" />
      <circle cx="7.3" cy="8.3" r="1.3" />
      <path d="M17 13.5 13 9.8a1.6 1.6 0 0 0-2.2.05L6.5 14" />
    </svg>
  );
}

export function MessagesIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="4.5" width="14" height="11" rx="1.6" />
      <path d="M3.5 5.5 10 11l6.5-5.5" />
    </svg>
  );
}

export function StaffIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M10 2.5 15.5 4.4v3.8c0 4-2.3 6.7-5.5 8.3-3.2-1.6-5.5-4.3-5.5-8.3V4.4Z" />
      <path d="M7.6 9.6 9.2 11l3.2-3.4" />
    </svg>
  );
}

export function PosIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 6h14l-1.4 7.2a2 2 0 0 1-2 1.6H6.4a2 2 0 0 1-2-1.6L3 6Z" />
      <path d="M6.5 6V4.8A3.5 3.5 0 0 1 10 1.3a3.5 3.5 0 0 1 3.5 3.5V6" />
      <path d="M7.5 16.5v.4a2 2 0 1 0 4 0v-.4" />
    </svg>
  );
}

export function HistoryIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3.5 10a6.5 6.5 0 1 0 2.1-4.8" />
      <path d="M3 3.5v3h3" />
      <path d="M10 6.5V10l2.4 1.4" />
    </svg>
  );
}

export function RevenueIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 14.5 8 9l3 3 6-6.5" />
      <path d="M13.5 5h3.5v3.5" />
    </svg>
  );
}

export function StockIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="7" width="14" height="9.5" rx="1.4" />
      <path d="M3 7 5.5 3.5h9L17 7" />
      <path d="M8 10.5h4" />
    </svg>
  );
}

export function WarningIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M10 3 17.3 16H2.7Z" />
      <path d="M10 8.3v3.2" />
      <circle cx="10" cy="14" r="0.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.6" />
      <path d="M3 5.5 10 11l7-5.5" />
    </svg>
  );
}

export function SuppliersIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="2.5" y="6.5" width="9" height="7" rx="1.2" />
      <path d="M11.5 9h3.2L17 11.6v2h-5.5Z" />
      <circle cx="6" cy="15" r="1.4" />
      <circle cx="14.2" cy="15" r="1.4" />
    </svg>
  );
}

export function PurchasesIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="2.5" width="12" height="15" rx="1.4" />
      <path d="M7 6.5h6M7 9.5h6M7 12.5h3.5" />
      <path d="M10 13.5v3.2M8.3 15.2 10 16.9l1.7-1.7" />
    </svg>
  );
}
