"use client"

import { useState } from "react"

export default function TicketPage() {
  const [activeTab, setActiveTab] = useState("details")
  const [showModal, setShowModal] = useState(false)
  const [selectedParent, setSelectedParent] = useState<string | null>(null)

  const mockTickets = [
    { id: "INC-001", title: "Network Outage - Main Office" },
    { id: "SR-100", title: "Cannot Access Email - Network Issue" },
    { id: "SR-101", title: "VPN Connection Failed" },
  ]

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-xl font-bold mb-4">Ticket: Unable to send emails</h1>

      {/* Tabs */}
      <div className="flex gap-4 border-b mb-4">
        <button
          className={`p-2 ${
            activeTab === "details" ? "border-b-2 border-blue-600" : ""
          }`}
          onClick={() => setActiveTab("details")}
        >
          Details
        </button>
        <button
          className={`p-2 ${
            activeTab === "related" ? "border-b-2 border-blue-600" : ""
          }`}
          onClick={() => setActiveTab("related")}
        >
          Related Tickets
        </button>
      </div>

      {/* Details Tab */}
      {activeTab === "details" && (
        <div className="p-4 bg-white rounded shadow">
          <p>
            Hi Team, <br /> I have been unable to send any emails since this
            morning. What&apos;s going on?
          </p>
        </div>
      )}

      {/* Related Tickets Tab */}
      {activeTab === "related" && (
        <div className="p-4 bg-white rounded shadow">
          {selectedParent ? (
            <div>
              <p className="mb-2">
                Linked Parent:{" "}
                <span className="font-semibold text-blue-600">
                  {selectedParent}
                </span>
              </p>
              <button
                onClick={() => setSelectedParent(null)}
                className="text-red-500 underline"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p>No parent or child tickets added yet!</p>
              <button
                onClick={() => setShowModal(true)}
                className="text-blue-600 underline mt-2"
              >
                Add Parent Ticket
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-[600px] p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Add Parent Ticket</h2>

            <div className="flex gap-6 mb-4">
              <label className="flex items-center gap-2">
                <input type="radio" name="ticketType" defaultChecked />
                New Ticket
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="ticketType" />
                Existing Ticket
              </label>
            </div>

            <ul className="space-y-2 mb-4 max-h-48 overflow-y-auto">
              {mockTickets.map((t) => (
                <li
                  key={t.id}
                  className="flex justify-between items-center border p-2 rounded hover:bg-gray-50"
                >
                  <span>
                    <span className="font-semibold">{t.id}</span> - {t.title}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedParent(`${t.id} - ${t.title}`)
                      setShowModal(false)
                    }}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Select
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
