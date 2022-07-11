import { useMemo, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { NewNote } from './pages/NewNote';
import { v4 as uuidV4 } from 'uuid';
import { NoteLayout } from './layouts/NoteLayout';
import { NoteList } from './pages/NoteList';
import { Note } from './pages/Note';
import { EditNote } from './pages/EditNote';

export type Note = {
	id: string;
} & NoteData;

export type RawNote = {
	id: string;
} & RawNoteData;

export type RawNoteData = {
	title: string;
	markdown: string;
	tagIds: string[];
};

export type NoteData = {
	title: string;
	markdown: string;
	tags: Tag[];
};

export type Tag = {
	id: string;
	label: string;
};

function App() {
	const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', []);
	const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);

	const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

	const notesWithTags = useMemo(() => {
		return notes.map(note => {
			return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) };
		});
	}, [notes, tags]);

	function onCreateNote({ tags, ...data }: NoteData) {
		setNotes(prevNotes => {
			return [...prevNotes, { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) }];
		});
	}

	function onUpdateNote(id: string, { tags, ...data }: NoteData) {
		setNotes(prevNotes => {
			return prevNotes.map(note => {
				if (note.id === id) {
					return { ...note, ...data, tagIds: tags.map(tag => tag.id) };
				} else {
					return note;
				}
			});
		});
	}

	function onDeleteNote(id: string) {
		setNotes(prevNotes => {
			return prevNotes.filter(note => note.id !== id);
		});
	}

	function addTag(tag: Tag) {
		setTags(prev => [...prev, tag]);
	}

	function updateTag(id: string, label: string) {
		setTags(prevTags => {
			return prevTags.map(tag => {
				if (tag.id === id) {
					return { ...tag, label };
				} else {
					return tag;
				}
			});
		});
	}

	function deleteTag(id: string) {
		setTags(prevTags => {
			return prevTags.filter(tag => tag.id !== id);
		});
	}

	return (
		<main>
			<div className="title__container">
				<div>
					<Link to="/">
						<h1 className="text-3xl font-bold">Takenote</h1>
					</Link>
					<h2>Crea, guarda y revisa tus notas.</h2>
				</div>
				<div className="flex gap-2">
					<Link to="/new">
						<button
							type="button"
							className="inline-flex items-center px-6 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Crear Nota
						</button>
					</Link>
					<button
						type="button"
						onClick={() => setEditTagsModalIsOpen(true)}
						className="inline-flex items-center px-6 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Etiquetas
					</button>
				</div>
			</div>

			<Routes>
				<Route
					path="/"
					element={
						<NoteList
							availableTags={tags}
							notes={notesWithTags}
							onUpdateTag={updateTag}
							onDeleteTag={deleteTag}
						/>
					}
				/>
				<Route
					path="/new"
					element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />}
				/>
				<Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
					<Route index element={<Note onDelete={onDeleteNote} />} />
					<Route
						path="edit"
						element={<EditNote onSubmit={onUpdateNote} onAddTag={addTag} availableTags={tags} />}
					/>
				</Route>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</main>
	);
}

export default App;
