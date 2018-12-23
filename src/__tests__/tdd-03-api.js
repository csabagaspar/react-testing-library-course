// these should normally be in your jest setupTestFrameworkScriptFile
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import {render, fireEvent} from 'react-testing-library'
// 🐨 you'll need to import your mock savePost from '../api' here
import {savePost as mockSavePost} from '../api'
import {Editor} from '../post-editor'

// 🐨 use jest.mock to mock out the ../api module and return a `savePost`
// jest.fn function that resolves a promise

// 🐨 after each test, the mock savePost mock function should be cleared (mockClear)

// 🐨 unskip this test
jest.mock('../api', () => {
  return {
    savePost: jest.fn(() => Promise.resolve({})),
  }
})

afterEach(() => {
  mockSavePost.mockClear()
})

test('renders a form with title, content, tags, and a submit button', () => {
  // 🐨 pass a fake user (an object with an ID) to the editor as a prop
  const fakeUser = {
    id: 1,
  }
  const fakePost = {
    title: 'title1',
    content: 'content1',
    tags: ['tag1', 'tag2'],
  }
  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)

  // 🐨 set the value of each of these fields
  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  // 💯 tags should be a comma-separated list of values here
  getByLabelText(/tags/i).value = fakePost.tags
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  expect(submitButton).toBeDisabled()

  // 🐨 assert that the mock `savePost` function was called once
  // and was called with the fake post data (title, content, and tags) and the authorId
  // 💯 tags should be an array of values here.
  expect(mockSavePost).toHaveBeenCalledTimes(1)
  expect(mockSavePost).toHaveBeenCalledWith({
    authorId: fakeUser.id,
    ...fakePost,
  })
})
