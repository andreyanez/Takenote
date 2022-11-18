import { useMemo, useState } from 'react';
import { Badge, Button, Card, Col, Form, Modal, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';
import { Tag } from '../App';
import styles from './NoteList.module.css';

export function NoteList() {
	return (
		<>
			<Row className="align-items-center mb-4">
				<Col>
					<h1>Notes</h1>
				</Col>
				<Col xs="auto">
					<Stack gap={2} direction="horizontal">
						<Link to="/new">
							<Button variant="primary">Create</Button>
						</Link>
						<Button variant="outline-secondary">Edit Tags</Button>
					</Stack>
				</Col>
			</Row>
		</>
	);
}
