// these should normally be in your jest setupTestFrameworkScriptFile
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

// 🐨 you're gonna need these
// import React from 'react'
import React from 'react'
// import {render} from 'react-testing-library'
import {render} from 'react-testing-library'
// import {Editor} from '../post-editor'
import {Editor} from '../post-editor'

test('renders a form with title, content, tags, and a submit button', () => {
  // 🐨 render the editor
  const {getByLabelText, getByText} = render(<Editor />)
  expect(getByLabelText(/title/i)).toBeInTheDocument()
  expect(getByLabelText(/content/i)).toBeInTheDocument()
  expect(getByLabelText(/tags/i)).toBeInTheDocument()
  expect(getByText(/submit/i)).toBeInTheDocument()

  // 🐨 verify that you can get the title, content, and tags by their label text
  // 🐨 verify that you can get the submit button by its label text
})
