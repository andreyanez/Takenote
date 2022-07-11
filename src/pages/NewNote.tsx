import { NoteData, Tag } from '../App';
import { NoteForm } from '../components/NoteForm';

type NewNoteProps = {
	onSubmit: (data: NoteData) => void;
	onAddTag: (tag: Tag) => void;
	availableTags: Tag[];
};

export function NewNote({ onSubmit, onAddTag, availableTags }: NewNoteProps) {
	return (
		<>
			<h1 className="md:text-left sm:text-center sm:text-6xl mb-6 md:text-2xl">Nueva nota</h1>
			<NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
		</>
	);
}
