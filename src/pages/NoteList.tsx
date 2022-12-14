import { useMemo, useState } from 'react';
import ReactSelect from 'react-select';
import { Tag } from '../App';
import '../styles/NoteList.scss';
import { NoteCard } from '../components/NoteCard';
// import { Modal } from 'react-bootstrap';

type SimplifiedNote = {
	tags: Tag[];
	title: string;
	id: string;
};

type NoteListProps = {
	availableTags: Tag[];
	notes: SimplifiedNote[];
	onUpdateTag: (id: string, label: string) => void;
	onDeleteTag: (id: string) => void;
};

type EditTagsModalProps = {
	show: boolean;
	availableTags: Tag[];
	handleClose: () => void;
	onDeleteTag: (id: string) => void;
	onUpdateTag: (id: string, label: string) => void;
};

export function NoteList({ availableTags, notes, onUpdateTag, onDeleteTag }: NoteListProps) {
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [title, setTitle] = useState('');

	const filteredNotes = useMemo(() => {
		return notes.filter(note => {
			return (
				(title === '' || note.title.toLowerCase().includes(title.toLowerCase())) &&
				(selectedTags.length === 0 ||
					selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
			);
		});
	}, [title, selectedTags, notes]);

	return (
		<>
			<form>
				<div className="flex gap-y-3 flex-col md:flex-row md:justify-end md:gap-3 md:items-end">
					<div className="md:w-1/4">
						<label
							htmlFor="title"
							className="ml-px pl-4 block text-sm font-medium text-gray-700 sr-only"
						>
							Título de Nota
						</label>
						<div className="mt-1">
							<input
								type="text"
								name="title"
								id="title"
								value={title}
								onChange={e => setTitle(e.target.value)}
								className="shadow-sm focus:ring-neutral focus:border-neutral block w-full sm:text-sm border-gray-300 px-4 rounded-full"
								placeholder="Busca tu nota aqui"
							/>
						</div>
					</div>
					<div className="md:w-1/4">
						<label
							htmlFor="etiqueta"
							className="ml-px pl-4 block text-sm font-medium text-gray-700 sr-only"
						>
							Busca por etiquetas
						</label>
						<div className="mt-1">
							<ReactSelect
								classNamePrefix="react-select"
								className="shadow-sm focus:ring-neutral focus:border-neutral block w-full sm:text-sm border-gray-300 rounded-full"
								value={selectedTags.map(tag => {
									return { label: tag.label, value: tag.id };
								})}
								options={availableTags.map(tag => {
									return { label: tag.label, value: tag.id };
								})}
								onChange={tags => {
									setSelectedTags(
										tags.map(tag => {
											return { label: tag.label, id: tag.value };
										})
									);
								}}
								placeholder="Busca por etiquetas"
								isMulti
							/>
						</div>
					</div>
				</div>
			</form>
			<div className="mt-9">
				{notes.length > 0 ? (
					<ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{filteredNotes.map(note => (
							<NoteCard key={note.id} id={note.id} title={note.title} tags={note.tags} />
						))}
					</ul>
				) : (
					<div className="pt-14">
						<h3 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
							Bienvenid@!
						</h3>
						<p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
							Crea tu primera nota para empezar.
						</p>
					</div>
				)}
			</div>
			{/* <EditTagsModal
				onUpdateTag={onUpdateTag}
				onDeleteTag={onDeleteTag}
				show={editTagsModalIsOpen}
				handleClose={() => setEditTagsModalIsOpen(false)}
				availableTags={availableTags}
			/> */}
		</>
	);
}

function EditTagsModal({
	availableTags,
	handleClose,
	show,
	onUpdateTag,
	onDeleteTag,
}: EditTagsModalProps) {
	return (
		<div>
			<div>
				<h3>Edita tus etiquetas</h3>
			</div>
			<div>
				<form>
					<div>
						{availableTags.map(tag => (
							<div key={tag.id}>
								<div>
									<input
										type="text"
										value={tag.label}
										onChange={e => onUpdateTag(tag.id, e.target.value)}
									/>
								</div>
								<div>
									<button onClick={() => onDeleteTag(tag.id)}>&times;</button>
								</div>
							</div>
						))}
					</div>
				</form>
			</div>
		</div>
	);
}
