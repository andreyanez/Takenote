import { NoteData, Tag } from '../App';
import { NoteForm } from '../components/NoteForm';
import { useNote } from '../layouts/NoteLayout';

type EditNoteProps = {
	onSubmit: (id: string, data: NoteData) => void;
	onAddTag: (tag: Tag) => void;
	availableTags: Tag[];
};

export function EditNote({ onSubmit, onAddTag, availableTags }: EditNoteProps) {
	const note = useNote();
	return (
		<>
			<h1 className="md:text-left sm:text-center sm:text-6xl mb-6 md:text-2xl">Edita tu nota</h1>
			<NoteForm
				title={note.title}
				markdown={note.markdown}
				tags={note.tags}
				onSubmit={data => onSubmit(note.id, data)}
				onAddTag={onAddTag}
				availableTags={availableTags}
			/>
		</>
	);
}
