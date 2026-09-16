export type Paginated<T> = {
  data: T[];
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
};

export type ResourcePaginated<T> = {
  data: T[];
  meta: { current_page: number; last_page: number; total: number; per_page: number };
};

export type Product = {
  id: number;
  name: string;
  type: "wine" | "drink" | "gaming_package" | "service";
  category: string | null;
  description: string | null;
  size: string | null;
  price: string;
  image_url: string | null;
  is_stocked: boolean;
  stock_quantity: number | null;
  low_stock_threshold: number;
  status: "active" | "inactive" | "reserve_only";
};

export type EventItem = {
  id: number;
  title: string;
  date: string;
  frequency: "Weekly" | "Monthly" | "On Request" | "Seasonal";
  description: string | null;
  icon: string | null;
  image_url: string | null;
  image_position: string | null;
};

export type Competition = {
  id: number;
  title: string;
  entry_fee_product_id: number | null;
  entry_fee: string;
  first_prize: string;
  second_prize: string;
  third_prize: string;
  rules: string[] | null;
  registration_opens_at: string | null;
  registration_closes_at: string | null;
  event_date: string | null;
  status: "upcoming" | "open" | "closed" | "completed";
};

export type CompetitionRegistration = {
  id: number;
  competition_id: number;
  competition?: Competition;
  name: string;
  phone: string;
  email: string;
  gamertag: string;
  game: string;
  state: string;
  payment_status: "pending" | "paid";
  reference_code?: string;
  created_at: string;
};

export type Booking = {
  id: number;
  player_id: number | null;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  occasion: string | null;
  special_request: string | null;
  status: "pending" | "confirmed" | "cancelled";
};

export type GalleryItem = {
  id: number;
  title: string;
  category: string;
  type: "image" | "video";
  src: string;
  poster: string | null;
};

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  message: string;
  status: "new" | "read";
  created_at: string;
};

export type Staff = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: "admin" | "cashier";
  is_active: boolean;
};

export type SaleItem = {
  id: number;
  sale_id: number;
  product_id: number;
  quantity: number;
  unit_price: string;
  line_total: string;
  product?: Product;
};

export type Sale = {
  id: number;
  sale_number: string;
  staff_id: number | null;
  cash_shift_id: number | null;
  customer_name: string | null;
  customer_email: string | null;
  source: "pos" | "wine_reservation" | "competition_entry" | "website_order";
  payment_method: string | null;
  payment_reference: string | null;
  subtotal: string;
  total: string;
  status: "pending" | "completed" | "refunded";
  created_at: string;
  items: SaleItem[];
};

export type CarImage = {
  id: number;
  image_url: string;
  sort_order: number;
};

export type Car = {
  id: number;
  make: string;
  model: string;
  year: number;
  price: string;
  deposit_amount: string;
  mileage: number | null;
  condition: "new" | "used" | "certified_pre_owned";
  transmission: "automatic" | "manual";
  fuel_type: "petrol" | "diesel" | "hybrid" | "electric";
  color: string | null;
  vin: string | null;
  description: string | null;
  features: string[];
  status: "available" | "reserved" | "sold";
  images: CarImage[];
  created_at: string;
};

export type CarOrder = {
  id: number;
  reference_code: string;
  name: string;
  phone: string;
  email: string;
  notes: string | null;
  status: "pending" | "paid" | "completed" | "cancelled";
  car?: Car;
  sale?: Sale;
  created_at: string;
};

export type MarketplaceCategory = { id:number; parent_id:number|null; name:string; slug:string; description:string|null; image_url:string|null; sort_order:number; is_active:boolean; children:MarketplaceCategory[] };
export type MarketplaceListing = {
  id:number; category:MarketplaceCategory; name:string; slug:string; sku:string|null; short_description:string|null; description:string|null;
  price:string; compare_at_price:string|null; deposit_amount:string|null; condition:"new"|"used"|"refurbished"|"certified_pre_owned";
  status:"draft"|"active"|"reserved"|"sold"|"out_of_stock"|"archived"; stock_quantity:number|null; is_featured:boolean;
  attributes:Record<string, unknown>; images:Array<{id:number;image_url:string;alt_text:string|null;sort_order:number}>;
  details:({type:"vehicle";make:string;model:string;year:number;mileage:number|null;transmission:string|null;fuel_type:string|null;color:string|null;vin:string|null;features:string[]})|null;
  fashion_details:{brand:string|null;gender:string|null;genders:string[];material:string|null;sizes:string[];colors:string[]}|null;
  gadget_details:{brand:string|null;model:string|null;storage:string|null;memory:string|null;warranty:string|null;specifications:Record<string,unknown>}|null;
  variants:Array<{id:number;sku:string|null;options:Record<string,string>;price:string|null;stock_quantity:number;is_active:boolean}>;
};

export type MarketplaceOrder = {
  id: number; reference_code: string; name: string; phone: string; email: string;
  fulfillment_type: "pickup" | "delivery"; delivery_address: string | null;
  delivery_zone?: { id: number; name: string; estimated_delivery: string | null } | null;
  subtotal: string; delivery_fee: string; total: string;
  status: "pending" | "confirmed" | "processing" | "ready_for_pickup" | "dispatched" | "delivered" | "cancelled";
  payment_status: "unpaid" | "paid" | "refund_pending" | "refunded";
  tracking_reference: string | null; internal_notes: string | null; cancellation_reason: string | null; created_at: string;
  items: Array<{
    id: number; listing_name: string; listing_sku: string | null; quantity: number;
    purchase_type: "full" | "deposit"; unit_price: string; line_total: string;
    selected_options: Record<string, string>; is_preorder: boolean; category_slug: string | null;
  }>;
  payment_attempts: Array<{ id: number; reference: string; provider: string; amount: string; status: string; paid_at: string | null; created_at: string }>;
};

export type Order = {
  id: number;
  reference_code: string;
  name: string;
  phone: string;
  email: string;
  fulfillment_type: "pickup" | "delivery";
  delivery_address: string | null;
  notes: string | null;
  status: "pending" | "paid" | "completed" | "cancelled";
  sale?: Sale;
  created_at: string;
};

export type CashShift = {
  id: number;
  cashier_id: number;
  opening_float: string;
  expected_cash: string | null;
  closing_count: string | null;
  discrepancy: string | null;
  status: "open" | "closed";
  notes: string | null;
  opened_at: string;
  closed_at: string | null;
};

export type CashierDashboardStats = {
  sales_today_count: number;
  sales_today_total: number;
  low_stock_products: Array<{
    id: number;
    name: string;
    stock_quantity: number | null;
    low_stock_threshold: number;
  }>;
};

export type DashboardStats = {
  total_registrations: number;
  total_bookings: number;
  upcoming_events: number;
  available_products: number;
  low_stock_products: number;
  recent_messages: number;
  revenue_today: number;
  revenue_this_month: number;
};

export type SalesReport = {
  from: string;
  to: string;
  rows: Array<{ date: string; revenue: string; sale_count: number }>;
};

export type TopProductsReport = {
  from: string;
  to: string;
  rows: Array<{
    product_id: number;
    total_quantity: string;
    total_revenue: string;
    product: { id: number; name: string; type: string };
  }>;
};

export type CompetitionAnalyticsRow = {
  id: number;
  title: string;
  status: string;
  entry_fee: string;
  total_registrations: number;
  paid_registrations: number;
  pending_registrations: number;
  revenue: number;
};

export type BookingsAnalytics = {
  by_status: Array<{ status: string; count: number }>;
  from: string;
  to: string;
  trend: Array<{ date: string; count: number }>;
};

export type PlayersAnalytics = {
  total_players: number;
  from: string;
  to: string;
  trend: Array<{ date: string; count: number }>;
};

export type Supplier = {
  id: number;
  name: string;
  contact_name: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  notes: string | null;
  is_active: boolean;
};

export type PurchaseInvoiceItem = {
  id: number;
  purchase_invoice_id: number;
  product_id: number;
  quantity: number;
  unit_cost: string;
  new_price: string | null;
  line_total: string;
  product?: Product;
};

export type PurchaseInvoice = {
  id: number;
  supplier_id: number;
  supplier?: Supplier;
  invoice_number: string;
  invoice_date: string;
  due_date: string | null;
  status: "pending" | "received" | "cancelled";
  payment_status: "unpaid" | "paid";
  subtotal: string;
  total: string;
  notes: string | null;
  items: PurchaseInvoiceItem[];
};

export function formatNaira(value: string | number): string {
  const amount = typeof value === "string" ? Number(value) : value;
  return `₦${amount.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`;
}
