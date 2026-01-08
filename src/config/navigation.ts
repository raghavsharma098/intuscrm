import { 
  LayoutDashboard, 
  Inbox, 
  Megaphone, 
  Users, 
  FileText, 
  LifeBuoy, 
  Phone, 
  CreditCard, 
  BarChart, 
  Settings 
} from 'lucide-react';

export const MAIN_NAVIGATION = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    category: "metrics",
    description: "Business status at a glance"
  },
  {
    title: "Inbox",
    path: "/inbox",
    icon: Inbox,
    category: "communication",
    description: "Unified SMS, WhatsApp, and Email"
  },
  {
    title: "Campaigns",
    path: "/campaigns",
    icon: Megaphone,
    category: "marketing",
    description: "Broadcast messages and audiences"
  },
  {
    title: "Leads (CRM)",
    path: "/leads",
    icon: Users,
    category: "sales",
    description: "Customer data and timeline"
  },
  {
    title: "Sales",
    path: "/sales",
    icon: FileText,
    category: "sales",
    description: "Quotations and Invoices"
  },
  {
    title: "Helpdesk",
    path: "/helpdesk",
    icon: LifeBuoy,
    category: "support",
    description: "Support tickets and SLA"
  },
  {
    title: "Voice & OTP",
    path: "/voice-otp",
    icon: Phone,
    category: "developer",
    description: "API keys and call logs"
  },
  {
    title: "Billing & Wallet",
    path: "/billing",
    icon: CreditCard,
    category: "finance",
    description: "Recharge and transaction history"
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: BarChart,
    category: "reporting",
    description: "ROI and country-wise spend"
  },
  {
    title: "Admin & Settings",
    path: "/admin",
    icon: Settings,
    category: "system",
    description: "Organization and user roles"
  }
];
