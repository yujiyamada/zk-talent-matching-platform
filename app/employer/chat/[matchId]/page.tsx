"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Send, Paperclip } from "lucide-react"

interface Message {
  id: string
  senderRole: "User" | "Employer"
  text: string
  createdAt: string
}

export default function ChatPage() {
  const params = useParams()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderRole: "Employer",
      text: "Hi! Thanks for applying. I'd like to discuss the role further.",
      createdAt: "2024-01-15T10:00:00",
    },
    {
      id: "2",
      senderRole: "User",
      text: "Hello! I'm very interested in this opportunity. What would you like to know?",
      createdAt: "2024-01-15T10:15:00",
    },
    {
      id: "3",
      senderRole: "Employer",
      text: "Can you tell me about your experience with Anchor and Solana development?",
      createdAt: "2024-01-15T10:20:00",
    },
    {
      id: "4",
      senderRole: "User",
      text: "I've been working with Solana for 2+ years, building DeFi protocols and NFT marketplaces. I'm comfortable with Anchor framework and have deployed several programs to mainnet.",
      createdAt: "2024-01-15T10:25:00",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [matchStatus, setMatchStatus] = useState<"negotiating" | "offer" | "contract">("negotiating")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      senderRole: "Employer",
      text: newMessage,
      createdAt: new Date().toISOString(),
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const getStatusColor = (status: typeof matchStatus) => {
    switch (status) {
      case "negotiating":
        return "bg-yellow-600"
      case "offer":
        return "bg-blue-600"
      case "contract":
        return "bg-green-600"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/employer/jobs">
          <Button variant="ghost" size="sm" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </Button>
        </Link>

        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Match Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="mb-2 text-sm font-medium">Candidate</p>
                  <p className="text-sm text-muted-foreground">Anonymous until contract signed</p>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium">Position</p>
                  <p className="text-sm">Solana Engineer</p>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium">Match Status</p>
                  <Select value={matchStatus} onValueChange={(v: any) => setMatchStatus(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="negotiating">Negotiating</SelectItem>
                      <SelectItem value="offer">Offer Sent</SelectItem>
                      <SelectItem value="contract">Contract Signed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-lg border border-border bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">
                    Personal information will be revealed once both parties sign the contract
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="flex h-[600px] flex-col">
              <CardHeader className="border-b border-border">
                <div className="flex items-center justify-between">
                  <CardTitle>Conversation</CardTitle>
                  <Badge className={getStatusColor(matchStatus)}>
                    {matchStatus.charAt(0).toUpperCase() + matchStatus.slice(1)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderRole === "Employer" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.senderRole === "Employer"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`mt-1 text-xs ${
                            message.senderRole === "Employer" ? "text-primary-foreground/70" : "text-muted-foreground"
                          }`}
                        >
                          {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              <div className="border-t border-border p-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="shrink-0 bg-transparent">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="icon" className="shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
