import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../features/ContactSlice";

function Contact() {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector((state) => state.contactAdmin);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center text-gray-500 py-10">Loading enquiries...</p>;
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-6 bg-red-100 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!contacts.length) {
    return <p className="text-center text-gray-500 py-10">No enquiries found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Enquiries ({contacts.length})
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Enquiry</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Email Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{c.name}</td>
                <td className="px-4 py-3">{c.email}</td>
                <td className="px-4 py-3">{c.phone || "-"}</td>
                <td className="px-4 py-3">{c.enquiry || "-"}</td>
                <td className="px-4 py-3 max-w-xs truncate" title={c.message}>
                  {c.message}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      c.emailStatus === "sent"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {c.emailStatus || "pending"}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(c.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Contact;