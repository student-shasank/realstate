import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";

export default function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
    ],
    content: value || "<p></p>",
    editorProps: {
      attributes: {
        class:
          "prose max-w-none min-h-[180px] p-3 outline-none",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()), // ✅ HTML output
  });

  if (!editor) return null;

  const btn = "px-2 py-1 border rounded text-sm hover:bg-gray-50";

  return (
    <div className="border rounded bg-white">
      <div className="flex flex-wrap gap-2 p-2 border-b">
        <button className={btn} type="button" onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>
        <button className={btn} type="button" onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>
        <button className={btn} type="button" onClick={() => editor.chain().focus().toggleUnderline().run()}>
          Underline
        </button>
        <button className={btn} type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}>
          Bullet
        </button>
        <button className={btn} type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          Ordered
        </button>
        <button
          className={btn}
          type="button"
          onClick={() => {
            const url = prompt("Enter link URL");
            if (!url) return;
            editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          Link
        </button>
        <button className={btn} type="button" onClick={() => editor.chain().focus().unsetLink().run()}>
          Unlink
        </button>
        <button className={btn} type="button" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}>
          Clear
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
