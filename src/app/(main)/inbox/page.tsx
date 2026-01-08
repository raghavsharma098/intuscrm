import { Search, Filter, Phone, Mail, MessageCircle, MoreVertical, Paperclip, Send } from "lucide-react";

export default function InboxPage() {
  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      {/* LEFT COLUMN: Conversation List */}
      <div className="w-80 border-r border-slate-200 flex flex-col bg-slate-50/50">
        <div className="p-4 border-b border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Inbox</h2>
            <button className="p-2 hover:bg-slate-100 rounded-md">
              <Filter className="h-4 w-4 text-slate-500" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-9 h-9 text-sm rounded-md border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
             <button className="flex-1 text-xs font-medium py-1.5 px-3 bg-slate-900 text-white rounded-md">All</button>
             <button className="flex-1 text-xs font-medium py-1.5 px-3 bg-white border border-slate-200 text-slate-600 rounded-md hover:bg-slate-50">Unread</button>
             <button className="flex-1 text-xs font-medium py-1.5 px-3 bg-white border border-slate-200 text-slate-600 rounded-md hover:bg-slate-50">Assigned</button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
           {/* Mock Conversation Item */}
           {[1, 2, 3, 4, 5].map((i) => (
             <div key={i} className="p-4 border-b border-slate-100 hover:bg-slate-100/50 cursor-pointer transition-colors bg-white">
               <div className="flex justify-between items-start mb-1">
                 <h4 className="font-semibold text-sm text-slate-900">Alice Smith</h4>
                 <span className="text-xs text-slate-400">10:23 AM</span>
               </div>
               <p className="text-sm text-slate-600 truncate mb-2">Can you send me the updated pricing list?</p>
               <div className="flex items-center gap-2">
                 <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                   Open
                 </span>
                 <MessageCircle className="h-3 w-3 text-slate-400" />
               </div>
             </div>
           ))}
        </div>
      </div>

      {/* MIDDLE COLUMN: Chat View */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6 bg-white">
          <div className="flex items-center gap-3">
             <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-semibold text-slate-600">
               AS
             </div>
             <div>
               <h3 className="font-semibold text-slate-900">Alice Smith</h3>
               <p className="text-xs text-slate-500">via WhatsApp</p>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-100 rounded-md text-slate-500">
              <Phone className="h-4 w-4" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-md text-slate-500">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
           {/* Messages */}
           <div className="flex justify-start">
             <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none py-3 px-4 max-w-[70%] shadow-sm">
               <p className="text-sm text-slate-800">Hi, I'm interested in your Enterprise plan.</p>
               <span className="text-[10px] text-slate-400 mt-1 block">Yesterday 2:30 PM</span>
             </div>
           </div>

           <div className="flex justify-end">
             <div className="bg-slate-900 text-white rounded-2xl rounded-tr-none py-3 px-4 max-w-[70%] shadow-md">
               <p className="text-sm">Hello Alice! I'd be happy to help with that. What specific features are you looking for?</p>
               <span className="text-[10px] text-slate-300 mt-1 block">Yesterday 2:35 PM • Read</span>
             </div>
           </div>
           
           <div className="flex justify-start">
             <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none py-3 px-4 max-w-[70%] shadow-sm">
               <p className="text-sm text-slate-800">Can you send me the updated pricing list?</p>
               <span className="text-[10px] text-slate-400 mt-1 block">10:23 AM</span>
             </div>
           </div>
        </div>

        <div className="p-4 border-t border-slate-200 bg-white">
          <div className="border border-slate-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-slate-400 focus-within:border-transparent">
            <textarea 
              className="w-full p-3 text-sm focus:outline-none min-h-[80px] rounded-t-lg resize-none"
              placeholder="Type your message... (Shift+Enter for new line)"
            />
            <div className="flex items-center justify-between p-2 bg-slate-50 rounded-b-lg border-t border-slate-100">
               <div className="flex gap-2">
                 <button className="p-2 hover:bg-slate-200 rounded-md text-slate-500">
                   <Paperclip className="h-4 w-4" />
                 </button>
                 <button className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-md">
                   Templates
                 </button>
               </div>
               <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors">
                 Send <Send className="h-3 w-3" />
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Customer Details */}
      <div className="w-80 border-l border-slate-200 bg-white overflow-y-auto hidden xl:block">
        <div className="p-6 border-b border-slate-100 text-center">
           <div className="h-20 w-20 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-xl font-bold text-slate-700 mb-3">
             AS
           </div>
           <h3 className="font-bold text-slate-900">Alice Smith</h3>
           <p className="text-sm text-slate-500">alice@company.com</p>
           <p className="text-sm text-slate-500">+1 (555) 123-4567</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Details</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <span className="font-medium text-green-600">Active Lead</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Source</span>
                <span className="font-medium text-slate-900">Campaign #3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Country</span>
                <span className="font-medium text-slate-900">USA</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Linked Campaigns</h4>
            <div className="p-3 border border-slate-100 rounded-md bg-slate-50 space-y-2">
              <div className="text-sm font-medium text-slate-900">Summer Sale V1</div>
              <div className="text-xs text-slate-500">Sent 2 days ago via SMS</div>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Notes</h4>
            <div className="p-3 bg-yellow-50/50 border border-yellow-100 rounded-md text-sm text-slate-700">
              Customer is asking for enterprise pricing. Close deal by EOM.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
