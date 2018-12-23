// You'll be building this...
import React from 'react'
import {savePost} from './api'

class Editor extends React.Component {
  titleRef = React.createRef()
  contentRef = React.createRef()
  tagsRef = React.createRef()

  state = {
    disabled: false,
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.props.user) {
      savePost({
        authorId: this.props.user.id,
        title: this.titleRef.current.value,
        content: this.contentRef.current.value,
        tags: this.tagsRef.current.value,
      })
    }
    this.setState({
      disabled: true,
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title-input">Title</label>
        <input id="title-input" ref={this.titleRef} />

        <label htmlFor="content-input">Content</label>
        <textarea id="content-input" ref={this.contentRef} />

        <label htmlFor="tags-input">Tags</label>
        <input id="tags-input" ref={this.tagsRef} />

        <button type="submit" disabled={this.state.disabled}>
          Submit
        </button>
      </form>
    )
  }
}
export {Editor}
