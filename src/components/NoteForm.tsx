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
		<form onSubmit={handleSubmit}>
			<div>
				<div>
					<div>
						<div>
							<label>Título</label>
							<input required ref={titleRef} defaultValue={title} />
						</div>
					</div>
					<div>
						<div>
							<label>Etiquetas</label>
							<CreatableReactSelect
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
								isMulti
							/>
						</div>
					</div>
				</div>
				<div>
					<label>Descripción</label>
					<textarea
						required
						rows={15}
						ref={markdownRef}
						style={{ resize: 'none' }}
						defaultValue={markdown}
					/>
				</div>
				<div className="justify-content-end">
					<button type="submit">Guardar</button>
					<Link to="..">
						<button type="button">Cancelar</button>
					</Link>
				</div>
			</div>
		</form>
	);
}
