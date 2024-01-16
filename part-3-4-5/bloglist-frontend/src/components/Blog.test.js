import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from "./Blog.jsx";

describe('Blog Component', () => {
  const blog = {
    id: 1,
    title: 'Sample Blog Title',
    author: 'John Doe',
    url: 'https://sampleblog.com',
    likes: 0,
  };

  const user = {
    name: 'Test User',
  };

  const updateBlog = jest.fn();
  const deleteBlog = jest.fn();

  test('renders blog title and author, hides URL and likes by default', () => {
    render(
      <Blog blog={blog} user={user} updateBlog={updateBlog} deleteBlog={deleteBlog} />
    );

    const titleElement = screen.getByText(blog.title, { exact: false });
    const authorElement = screen.getByText(blog.author, { exact: false });
    const urlElement = screen.queryByText(blog.url);
    const likesElement = screen.queryByText(`likes ${blog.likes}`);

    expect(titleElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
    expect(urlElement).not.toBeInTheDocument();
    expect(likesElement).not.toBeInTheDocument();
  });

  test("shows url and author when show button is clicked", async () => {
    render(<Blog blog={blog} user={user} updateBlog={updateBlog} deleteBlog={deleteBlog} />);

    const userClick = userEvent.setup();
    const button = screen.getByText("view");
    await userClick.click(button);

    const urlElement = screen.queryByText(blog.url);
    const likesElement = screen.queryByText(`likes ${blog.likes}`);

    expect(urlElement).toBeInTheDocument();
    expect(likesElement).toBeInTheDocument();
  });

  test("if like button pressed twice updateBlog called twice", async () => {
    render(
      <Blog blog={blog} user={user} updateBlog={updateBlog} deleteBlog={deleteBlog} />
    );


    const userClick = userEvent.setup();
    const viewButton = screen.getByText("view");
    await userClick.click(viewButton);

    // Find and click the like button twice
    const likeButton = await screen.findByText("like");
    await userEvent.click(likeButton);
    await userEvent.click(likeButton);

    // Assert that updateBlog was called twice
    expect(updateBlog).toHaveBeenCalledTimes(2);
  });

});
