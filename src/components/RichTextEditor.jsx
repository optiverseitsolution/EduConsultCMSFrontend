import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import React, { useRef } from "react";

import {
  Bold,
  Italic,
  Underline as UnderLine,
  StrikethroughIcon,
  CodeXml,
  TextAlignStart,
  TextAlignCenter,
  TextAlignEnd,
  AlignJustify,
  List,
  ListOrdered,
  Link as LINK,
  Image as PHOTO,
  X,
} from "lucide-react";

const RichTextEditor = ({ value, onChange, error }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
      }),
      Underline,
      Link,
      Image,
      BulletList,
      OrderedList,
      Placeholder.configure({
        placeholder: "Start typing...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph", "bulletList", "orderedList"],
      }),
    ],
    content: value || "<p></p>",
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) return null;

  const imageInputRef = useRef(null);

  return (
    <div className="border-base-300 rounded-lg border">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center rounded-t-lg gap-1 p-2 bg-base-200">
        <Btn
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold />
        </Btn>
        <Btn
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic />
        </Btn>
        <Btn
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderLine />
        </Btn>
        <Btn
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <StrikethroughIcon />
        </Btn>
        <Btn
          active={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <CodeXml />
        </Btn>

        <Divider />
        <Btn
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <TextAlignStart />
        </Btn>

        <Btn
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <TextAlignCenter />
        </Btn>

        <Btn
          active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <TextAlignEnd />
        </Btn>

        <Btn
          active={editor.isActive({ textAlign: "justify" })}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        >
          <AlignJustify />
        </Btn>

        <Btn
          active={editor.isActive("link")}
          onClick={() => {
            const url = prompt("Enter URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          <LINK />
        </Btn>

        <Btn
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List />
        </Btn>

        <Btn
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered />
        </Btn>

        <Btn onClick={() => imageInputRef.current.click()}>
          <PHOTO />
        </Btn>

        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const url = URL.createObjectURL(file);
            editor.chain().focus().setImage({ src: url }).run();

            e.target.value = null;
          }}
        />

        <Btn
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
        >
          <X />
        </Btn>
      </div>

      {/* Editor */}
      <div
        className={`border bg-base-100 rounded-b-lg
        ${error ? "border-error" : "border-base-300"}`}
        onClick={() => editor.chain().focus().run()}
      >
        <EditorContent editor={editor} />
      </div>

      {error && <p className="text-error text-xs mt-1">{error}</p>}
    </div>
  );
};

const Btn = ({ children, onClick, active }) => (
  <button
    type="button"
    onClick={onClick}
    className={`btn btn-xs ${active ? "btn-primary" : "btn-ghost"}`}
  >
    {children}
  </button>
);

const Divider = () => <div className="w-px h-5 bg-base-300 mx-1" />;

export default RichTextEditor;
