import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';

interface TipTapProps {
  name?: string;
  content?: string;
}

const TipTap: React.FC<TipTapProps> = ({ name, content }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    editable: true,
    content,
  });

  return (
    <div className="bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md py-1.5 lg:py-2 hd:py-2.5 hd:text-base shadow-sm outline-none">
      <EditorContent name={name} editor={editor} />
    </div>
  );
};

export default TipTap;
