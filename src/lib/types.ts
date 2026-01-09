export type Channel = "sms" | "email" | "whatsapp";

export interface Audience {
  id: string;
  name: string;
  description?: string;
  size: number;
  createdAt: string; // ISO string
}

export interface CampaignMessage {
  subject?: string; // email only
  body: string;
  mediaUrl?: string;
}

export interface Schedule {
  type: "now" | "scheduled";
  scheduledAt?: string; // ISO when type === 'scheduled'
  timezone?: string;
}

export type CampaignStatus =
  | "draft"
  | "scheduled"
  | "running"
  | "paused"
  | "completed"
  | "failed";

export interface Campaign {
  id: string;
  name: string;
  channel: Channel;
  audienceId: string;
  message: CampaignMessage;
  schedule: Schedule;
  status: CampaignStatus;
  createdAt: string;
  updatedAt: string;
  // Simple runtime metrics for UI only; backend will replace later
  metrics?: {
    sent: number;
    delivered: number;
    failed: number;
    opens?: number;
    clicks?: number;
  };
}

export interface PagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

export interface CreateCampaignInput {
  name: string;
  channel: Channel;
  audienceId: string;
  message: CampaignMessage;
  schedule: Schedule;
}

// Leads
export type LeadStatus = "new" | "contacted" | "qualified" | "lost";

export interface Lead {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  status: LeadStatus;
  source?: string; // e.g., Website, Import, API
  owner?: string; // user id or name placeholder
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface CreateLeadInput {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  status?: LeadStatus;
  source?: string;
}

// Sales
export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "cancelled";

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  status: InvoiceStatus;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInvoiceInput {
  customerId: string;
  customerName: string;
  items: Omit<InvoiceItem, "id" | "total">[];
  dueDate: string;
}

// Helpdesk
export type TicketPriority = "low" | "medium" | "high" | "urgent";
export type TicketStatus = "open" | "in-progress" | "resolved" | "closed";

export interface Ticket {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  customerId?: string;
  customerName?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketInput {
  subject: string;
  description: string;
  priority: TicketPriority;
  customerId?: string;
  customerName?: string;
}

// Billing
export interface WalletBalance {
  balance: number; // in USD
  currency?: string; // default USD
  updatedAt: string;
}

export type TransactionType = "credit" | "debit";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  createdAt: string;
}

// Voice & OTP
export interface ApiKey {
  id: string;
  name: string;
  key: string;
  active: boolean;
  createdAt: string;
}

export type LogType = "voice" | "otp";
export type LogStatus = "queued" | "sent" | "delivered" | "failed";

export interface VoiceOtpLog {
  id: string;
  type: LogType;
  status: LogStatus;
  to: string;
  messageId?: string;
  duration?: number; // seconds for voice
  cost?: number; // USD cost
  createdAt: string;
}

// Admin & Settings
export type UserRole = "owner" | "admin" | "agent" | "viewer";

export interface OrgSettings {
  name: string;
  domain?: string;
  timezone?: string;
  emailFrom?: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface CreateMemberInput {
  name: string;
  email: string;
  role?: UserRole;
}

export interface Integration {
  id: string;
  name: string;
  enabled: boolean;
  description?: string;
}

// Quotations
export type QuotationStatus = "draft" | "sent" | "accepted" | "rejected" | "expired";

export interface Quotation {
  id: string;
  quotationNumber: string;
  customerId: string;
  customerName: string;
  status: QuotationStatus;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  validUntil: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateQuotationInput {
  customerId: string;
  customerName: string;
  items: Omit<InvoiceItem, "id" | "total">[];
  validUntil: string;
}

// Plans
export type PlanType = "starter" | "professional" | "enterprise";

export interface Plan {
  id: PlanType;
  name: string;
  price: number;
  currency: string;
  billingPeriod: "monthly" | "yearly";
  features: string[];
  messageLimit?: number;
  voiceLimit?: number;
  apiAccess: boolean;
  support: "email" | "chat" | "priority";
  recommended?: boolean;
}

// Activity Log
export interface ActivityLog {
  id: string;
  action: string;
  module: string;
  description: string;
  createdAt: string;
  userId?: string;
  resourceId?: string;
}

// Inbox
export type MessageChannel = "sms" | "email" | "whatsapp";
export type MessageDirection = "inbound" | "outbound";

export interface Message {
  id: string;
  threadId: string;
  channel: MessageChannel;
  direction: MessageDirection;
  from: string;
  to: string;
  body: string;
  createdAt: string;
  read?: boolean;
}

export interface Thread {
  id: string;
  channel: MessageChannel;
  contact: string;
  contactName?: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  messages: Message[];
}
