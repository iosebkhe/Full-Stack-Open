import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogForm from './AddBlogForm.jsx';
import userEvent from '@testing-library/user-event';

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const titleInput = screen.getByPlaceholderText('write title here');
  const authorInput = screen.getByPlaceholderText('write author here');
  const UrlInput = screen.getByPlaceholderText('write url here');
  const sendButton = screen.getByText('create');

  await user.type(titleInput, 'testing a title...');
  await user.type(authorInput, 'testing a author...');
  await user.type(UrlInput, 'testing a url...');
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
});