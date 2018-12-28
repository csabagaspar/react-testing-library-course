// You'll be building this...
import React from 'react'
import {Redirect} from 'react-router'
import {savePost} from './api'

class Editor extends React.Component {
  state = {
    saved: false,
    redirect: false,
    error: null,
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.props.user) {
      const {title, content, tags} = e.target.elements
      const newPost = {
        title: title.value,
        content: content.value,
        tags: tags.value.split(',').map(t => t.trim()),
        authorId: this.props.user.id,
        date: new Date().toISOString(),
      }
      this.setState({
        saved: true,
      })
      savePost(newPost).then(
        () => this.setState({redirect: true}),
        response => this.setState({saved: false, error: response.data.error}),
      )
    }
  }
  render() {
    return this.state.redirect ? (
      <Redirect to="/" />
    ) : (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title-input">Title</label>
        <input id="title-input" name="title" />

        <label htmlFor="content-input">Content</label>
        <textarea id="content-input" name="content" />

        <label htmlFor="tags-input">Tags</label>
        <input id="tags-input" name="tags" />

        <button type="submit" disabled={this.state.saved}>
          Submit
        </button>
        {this.state.error ? (
          <div data-testid="post-error">{this.state.error}</div>
        ) : null}
      </form>
    )
  }
}
export {Editor}
