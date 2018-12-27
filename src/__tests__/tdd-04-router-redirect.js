// these should normally be in your jest setupTestFrameworkScriptFile
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
// 🐨 you'll need to also import wait from 'react-testing-library' here
import {render, fireEvent, wait} from 'react-testing-library'
// 🐨 import your mocked version of the Redirect component
import {Redirect as MockRedirect} from 'react-router'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import {savePost as mockSavePost} from '../api'
import {Editor} from '../post-editor'

// 🐨 you'll need to mock react-router's Redirect component here
jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  }
})

jest.mock('../api', () => {
  return {
    savePost: jest.fn(() => Promise.resolve()),
  }
})

afterEach(() => {
  // 🐨 clear the Redirect mock here
  mockSavePost.mockClear()
  MockRedirect.mockClear()
})

// 🐨 unskip this test
// 🐨 you'll need to make this an async test
test('renders a form with title, content, tags, and a submit button', async () => {
  const history = createMemoryHistory({initialEntries: ['/']})
  const fakeUser = {id: 'user-1'}
  const {getByLabelText, getByText} = render(
    <Router history={history}>
      <Editor user={fakeUser} />
    </Router>,
  )
  const fakePost = {
    title: 'Test Title',
    content: 'Test content',
    tags: ['tag1', 'tag2'],
  }
  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  //expect(submitButton).toBeDisabled()

  expect(mockSavePost).toHaveBeenCalledTimes(1)
  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    authorId: fakeUser.id,
  })

  await wait(() => {
    expect(MockRedirect).toHaveBeenCalledTimes(1)
    expect(MockRedirect).toHaveBeenCalledWith(
      {
        to: '/',
      },
      {},
    )
  })

  // 🐨 wait until your mock Redirect component has been called once
  // 🐨 ensure that your mock Redirect component was called with the props: {to: '/'}
  // 💯 react function components are called with 2 arguments: props and context
  // context in this case is an empty object.
})
