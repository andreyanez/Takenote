import { FormEvent, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CreatableReactSelect from 'react-select/creatable';
import { NoteData, Tag } from '../App';
import { v4 as uuidV4 } from 'uuid';

type NoteFormProps = {
	onSubmit: (data: NoteData) => void;
	onAddTag: (tag: Tag) => void;
	availableTags: Tag[];
} & Partial<NoteData>;

export function NoteForm({
	onSubmit,
	onAddTag,
	availableTags,
	title = '',
	markdown = '',
	tags = [],
}: NoteFormProps) {
	const titleRef = useRef<HTMLInputElement>(null);
	const markdownRef = useRef<HTMLTextAreaElement>(null);
	const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
	const navigate = useNavigate();
	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		onSubmit({
			title: titleRef.current!.value,
			markdown: markdownRef.current!.value,
			tags: selectedTags,
		});

		navigate('..');
	}

	return (
		<div className="max-w-2xl">
			<form onSubmit={handleSubmit}>
				<div className="flex gap-3 justify-between mb-8">
					<div className="w-1/2">
						<label htmlFor="title" className="ml-px pl-4 block text-sm font-medium text-gray-700">
							Título de Nota
						</label>
						<div className="mt-1">
							<input
								type="text"
								name="title"
								required
								ref={titleRef}
								defaultValue={title}
								className="shadow-sm focus:ring-neutral focus:border-neutral block w-full sm:text-sm border-gray-300 px-4 rounded-full"
							/>
						</div>
					</div>
					<div className="w-1/2">
						<label htmlFor="tags" className="ml-px pl-4 block text-sm font-medium text-gray-700 ">
							Etiquetas
						</label>
						<div className="mt-1">
							<CreatableReactSelect
								classNamePrefix="react-select"
								className="shadow-sm focus:ring-neutral focus:border-neutral block w-full sm:text-sm border-gray-300 rounded-full"
								onCreateOption={label => {
									const newTag = { id: uuidV4(), label };
									onAddTag(newTag);
									setSelectedTags(prev => [...prev, newTag]);
								}}
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
								placeholder="Busca etiquetas o crea una"
								isMulti
							/>
						</div>
					</div>
				</div>
				<div>
					<div>
						<label htmlFor="comment" className="block text-sm font-medium text-gray-700">
							Texto (Simple texto o Markdown)
						</label>
						<div className="mt-1">
							<textarea
								name="comment"
								id="comment"
								className="shadow-sm focus:border-neutral block w-full sm:text-sm border-gray-300 rounded-md resize-none"
								required
								rows={15}
								ref={markdownRef}
								defaultValue={markdown}
							/>
						</div>
					</div>
				</div>
				<div className="mt-4 flex justify-start gap-4">
					<button
						type="submit"
						className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Guardar
					</button>
					<Link to="..">
						<button
							type="button"
							className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
						>
							Cancelar
						</button>
					</Link>
				</div>
			</form>
		</div>
	);
}
