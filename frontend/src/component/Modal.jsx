import React from "react"

function Modal({
  isOpen,
  onClose,
  title,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  confirmationButtonClass = "bg-red-600 hover:bg-red-700",
  size = "sm"
}) {

  if (!isOpen) return null

  const sizeClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg"
  }

  return (

    <div className="fixed inset-0 flex items-center justify-center z-50">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={onClose}
      />

      {/* MODAL BOX */}
      <div
        className={`relative bg-white rounded-lg shadow-lg w-full ${sizeClass[size]} p-6`}
      >

        {/* TITLE */}
        <h2 className="text-lg font-semibold mb-4">
          {title}
        </h2>

        {/* BODY */}
        <div className="mb-6">
          {children}
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-white rounded ${confirmationButtonClass}`}
          >
            {confirmText}
          </button>

        </div>

      </div>

    </div>

  )
}

export default Modal