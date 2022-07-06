import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';
import { Tag } from '../App';
import '../styles/NoteList.scss';
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
	const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

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
		<main>
			<div className="title__container">
				<h1 className="text-3xl font-bold">Takenote</h1>
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
			<form>
				<div className="flex justify-end gap-3 items-end">
					<div className="w-1/4">
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
								className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 px-4 rounded-full"
								placeholder="Busca tu nota aqui"
							/>
						</div>
					</div>
					<div className="w-1/4">
						<label
							htmlFor="etiqueta"
							className="ml-px pl-4 block text-sm font-medium text-gray-700 sr-only"
						>
							Busca por etiquetas
						</label>
						<div className="mt-1">
							<ReactSelect
								classNamePrefix="react-select"
								className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-full"
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
				<ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{filteredNotes.map(note => (
						<NoteCard key={note.id} id={note.id} title={note.title} tags={note.tags} />
					))}
				</ul>
			</div>
			{/* <EditTagsModal
				onUpdateTag={onUpdateTag}
				onDeleteTag={onDeleteTag}
				show={editTagsModalIsOpen}
				handleClose={() => setEditTagsModalIsOpen(false)}
				availableTags={availableTags}
			/> */}
		</main>
	);
}

function NoteCard({ id, title, tags }: SimplifiedNote) {
	return (
		<Link to={`/${id}`} className="h-100 text-reset text-decoration-none">
			<li key={id} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
				<div className="w-full flex items-center justify-between p-6">
					<div className="flex flex-col items-center gap-y-3 justify-center w-full">
						<h3 className="text-gray-900 text-2xl font-medium truncate">{title}</h3>
						{tags.length > 0 && (
							<div className="flex gap-2">
								{tags.map(tag => (
									<span
										key={tag.id}
										className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full"
									>
										{tag.label}
									</span>
								))}
							</div>
						)}
					</div>
				</div>
			</li>
		</Link>
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
