import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';

export const defaultExtensions = [
    StarterKit.configure({
        bulletList: false,
        orderedList: false,
    }),
    BulletList,
    OrderedList,
    ListItem,
    TaskList,
    TaskItem.configure({
        nested: true,
    }),
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),
    Highlight,
    Color,
    TextStyle,
];
