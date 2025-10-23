"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, MessageSquare, MoreVertical, AlertTriangle, RefreshCw } from "lucide-react" // Removed Send icon
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useCompanySupabase } from "@/lib/supabase/company-client"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area" // Use ScrollArea for better scrolling

interface Message {
  type: "human" | "ai"
  data: {
    content: string
  }
}

interface Conversation {
  conversation_id: string
  history: Message[]
  status: string
  created_at: string
  // Derived fields for display
  customerName: string
  lastMessage: string
  lastMessageTime: string
}

export default function ConversationsPage() {
  const companySupabase = useCompanySupabase()
  const { toast } = useToast()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  // Removed messageInput state
  const [isLoading, setIsLoading] = useState(true)

  const fetchConversations = async () => {
    if (!companySupabase) {
      setIsLoading(false)
      console.log("Conversations: Company Supabase client not available.")
      return
    }
    console.log("Conversations: Fetching data...")
    setIsLoading(true)
    const { data, error } = await companySupabase
      .from("conversation_history")
      .select("conversation_id, history, status, created_at")
      .order("created_at", { ascending: false }) // Fetch latest first

    if (error) {
      toast({ title: "Error", description: "Failed to fetch conversations.", variant: "destructive" })
      console.error(error)
    } else {
      const formattedConversations = (data || []).map(
        (conv: any): Conversation => ({
          ...conv,
          customerName: `User-${conv.conversation_id.substring(0, 8)}`, // Simple identifier
          lastMessage: conv.history?.[conv.history.length - 1]?.data?.content || "No messages",
          lastMessageTime: new Date(conv.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }),
      )
      setConversations(formattedConversations)
      // Select the first conversation by default if none is selected or the selected one is gone
      if (
        formattedConversations.length > 0 &&
        (!selectedConversation ||
          !formattedConversations.find((c) => c.conversation_id === selectedConversation.conversation_id))
      ) {
        setSelectedConversation(formattedConversations[0])
      } else if (formattedConversations.length === 0) {
        setSelectedConversation(null) // Clear selection if no conversations
      }
      console.log("Conversations: Data fetched successfully.", formattedConversations)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchConversations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companySupabase]) // Re-fetch only when the client changes

  const filteredConversations = conversations.filter((conv) =>
    conv.customerName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Render message if Supabase is not connected
  if (!companySupabase && !isLoading) {
    return (
      <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[var(--dashboard-text-color)] tracking-tight">Database Not Connected</h3>
            <p className="text-[var(--dashboard-text-color)]/60 mt-2 max-w-md mx-auto">
              Please go to the settings page to connect your bot's database.
            </p>
            <Button asChild className="mt-6 bg-[var(--dashboard-text-color)] text-[#0A0A0A] hover:bg-[var(--dashboard-text-color)]/90">
              <Link href="/dashboard/settings">Go to Settings</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 flex-shrink-0">
         {/* --- MODIFIED: Added Animation --- */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--dashboard-text-color)] tracking-tight">Conversations</h1>
          <p className="text-sm text-[var(--dashboard-text-color)]/70 mt-1.5">View your chatbot conversations.</p>
        </div>
        {/* --- END MODIFICATION --- */}
        {/* --- MODIFIED: Added Animation & Delay --- */}
        <Button
          variant="outline"
          size="icon"
          onClick={fetchConversations}
          disabled={isLoading}
          className="border-[#2A2A2A] text-[var(--dashboard-text-color)]/60 hover:text-[var(--dashboard-text-color)] hover:bg-[#2A2A2A]/50 bg-transparent transition-all duration-200 self-start sm:self-auto flex-shrink-0 animate-in fade-in duration-500 ease-out"
          style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
        {/* --- END MODIFICATION --- */}
      </div>

      {/* --- MODIFIED: Added Animation & Delay and Fixed Scroll Issues (Bug #3 & #4) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 flex-1 min-h-0 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out" style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}>
        {/* Chat List Card (Left) */}
        <Card className="bg-[#1A1A1A] border-[#2A2A2A] lg:col-span-1 flex flex-col overflow-hidden transition-all duration-200 hover:border-[var(--dashboard-text-color)]/20 lg:h-full">
        {/* REMOVED fixed height h-[400px] */}
          <CardHeader className="flex-shrink-0 pb-4">
            <CardTitle className="text-xl font-semibold text-[var(--dashboard-text-color)]">Chats</CardTitle>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--dashboard-text-color)]/40" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-[#0A0A0A] border-[#2A2A2A] text-[var(--dashboard-text-color)] h-10 text-sm"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              {isLoading ? (
                <div className="flex items-center justify-center h-full min-h-[200px]">
                  <p className="text-base text-[var(--dashboard-text-color)]/60">Loading...</p>
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="flex items-center justify-center h-full min-h-[200px]">
                  <div className="text-center px-4">
                    <MessageSquare className="h-12 w-12 text-[var(--dashboard-text-color)]/20 mx-auto mb-3" />
                    <p className="text-base text-[var(--dashboard-text-color)]/60">No conversations found.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-1 px-4 pb-4">
                  {filteredConversations.map((conv) => (
                    <button
                      key={conv.conversation_id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`w-full p-4 flex items-start gap-3 hover:bg-[#2A2A2A]/50 transition-colors rounded-lg ${selectedConversation?.conversation_id === conv.conversation_id ? "bg-[#2A2A2A]/50" : ""}`}
                    >
                      <Avatar className="h-11 w-11 flex-shrink-0">
                        <AvatarFallback className="bg-[var(--dashboard-text-color)]/10 text-[var(--dashboard-text-color)] text-sm font-medium">
                          {conv.customerName.substring(5, 7)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-left overflow-hidden min-w-0">
                        <div className="flex items-center justify-between mb-1.5 gap-2">
                          <p className="text-sm font-semibold text-[var(--dashboard-text-color)] truncate">{conv.customerName}</p>
                          <span className="text-xs text-[var(--dashboard-text-color)]/40 flex-shrink-0">{conv.lastMessageTime}</span>
                        </div>
                        <p className="text-sm text-[var(--dashboard-text-color)]/60 truncate leading-relaxed">{conv.lastMessage}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Message View Card (Right) */}
        <Card className="bg-[#1A1A1A] border-[#2A2A2A] lg:col-span-2 flex flex-col overflow-hidden transition-all duration-200 hover:border-[var(--dashboard-text-color)]/20 lg:h-full">
        {/* REMOVED fixed height h-[500px] */}
          {selectedConversation ? (
            <>
              <CardHeader className="border-b border-[#2A2A2A] flex-shrink-0 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-11 w-11">
                      <AvatarFallback className="bg-[var(--dashboard-text-color)]/10 text-[var(--dashboard-text-color)] text-sm font-medium">
                        {selectedConversation.customerName.substring(5, 7)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg font-semibold text-[var(--dashboard-text-color)]">
                        {selectedConversation.customerName}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className={`mt-1.5 text-xs ${selectedConversation.status === "active" ? "border-green-500/50 text-green-500" : selectedConversation.status === "handover" ? "border-orange-500/50 text-orange-500" : "border-gray-500/50 text-gray-500"}`} // Adjusted handover color
                      >
                        {selectedConversation.status}
                      </Badge>
                    </div>
                  </div>
                  {/* Keep MoreVertical button for future actions */}
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5 text-[var(--dashboard-text-color)]/60" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-6 overflow-hidden">
                <ScrollArea className="h-full pr-4">
                  <div className="space-y-4">
                    {selectedConversation.history?.map((message, index) => (
                      <div key={index} className={`flex ${message.type === "human" ? "justify-start" : "justify-end"}`}>
                        <div
                          className={`max-w-[75%] rounded-lg px-4 py-3 ${message.type === "human" ? "bg-[#2A2A2A] text-[var(--dashboard-text-color)]" : "bg-[var(--dashboard-text-color)] text-[#0A0A0A]"}`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.data.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              {/* Removed the message input and send button section */}
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center px-4">
                <MessageSquare className="h-16 w-16 text-[var(--dashboard-text-color)]/20 mx-auto mb-4" />
                <p className="text-base text-[var(--dashboard-text-color)]/60">
                  {isLoading ? "Loading..." : "Select a conversation to view messages."}
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
      {/* --- END MODIFICATION --- */}
    </div>
  )
}