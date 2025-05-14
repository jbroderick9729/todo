import React, { useEffect, useRef } from 'react'

type DeleteConfirmationModalProps = {
  children: React.ReactNode
  onCancel: () => void
  onSubmit: () => void
  isOpen: boolean
}

export default function DeleteConfirmationModal({
  children,
  isOpen,
  onCancel,
  onSubmit,
}: DeleteConfirmationModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
    }
  }, [isOpen])

  return (
    <dialog
      ref={modalRef}
      className="m-auto bg-gray-100 backdrop:backdrop-brightness-80 backdrop:backdrop-blur-xs"
    >
      <header className="flex justify-around p-4 border-b-2 border-gray-200">
        <h2 className="text-2xl">Delete</h2>
      </header>
      {children}
      <footer className="flex justify-around p-4 border-t-2 border-gray-200">
        <button
          className="p-2 outline-1 rounded hover:bg-gray-100"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="p-2 text-red-500 outline-1 rounded  hover:bg-red-50"
          onClick={onSubmit}
          aria-label="Confirm Delete"
        >
          Delete
        </button>
      </footer>
    </dialog>
  )
}
