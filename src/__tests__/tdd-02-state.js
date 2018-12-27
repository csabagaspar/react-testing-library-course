// these should normally be in your jest setupTestFrameworkScriptFile
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import {render, fireEvent} from 'react-testing-library'
import {Editor} from '../post-editor'

test('renders a form with title, content, tags, and a submit button', () => {
  const history = createMemoryHistory({initialEntries: ['/']})
  const {getByLabelText, getByText} = render(
    <Router history={history}>
      <Editor />
    </Router>,
  )
  getByLabelText(/title/i)
  getByLabelText(/content/i)
  getByLabelText(/tags/i)
  const submitButton = getByText(/submit/i)
  // 🐨 click the submit button
  fireEvent.click(submitButton)
  // 🐨 verify that the submit button is disabled when clicked
  //expect(submitButton).toBeDisabled()
})
