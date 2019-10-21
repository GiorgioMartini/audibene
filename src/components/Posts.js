import React from 'react'
import { fetchPosts } from '../utils/api'
import chatIcon from '../images/black-bubble-speech.svg'

export default class Posts extends React.Component {
  state = {
    posts: [],
  }
  componentDidMount() {
    fetchPosts()
      .then((data) => {
        this.setState({ posts: data })
      })
      .catch((error) => {
        console.warn('Error fetching posts: ', error)

        this.setState({
          error: `There was an error fetching the posts.`
        })
      })
  }

  render() {
    const { posts } = this.state
    return (
      <React.Fragment>
        {posts && <PostsList
          className={this.state.postsClass}
          posts={posts}
          handleClick={this.handleClick}
          />}
      </React.Fragment>
    )
  }
}

function getRedditImg(img) {
  const defaultImg = 'https://socialmediaweek.org/wp-content/blogs.dir/1/files/reddit.jpg'
  if (img === 'default') {
    return defaultImg
  } else if (img === 'self') {
    return defaultImg
  }
  return img
}

function PostsList ({posts}) {
    return (
      <div className="mw7 center">
        <div className="bg-white mt3">
          {posts.map((post, i) => (
            <div key={i} className="br3 pa3">
              <div className="bg-near-white flex">
                <div className="post-img">
                  <img className="w-100 h-100 fit-cover" src={getRedditImg(post.thumbnail)} alt="" />
                </div>
                <div className="post-text pa3">
                  <p className="f4 ma0"> {post.title}</p>
                  <p className="f5 ma0 pt2">{post.selftext}</p>
                  <Comments comments={post.comments}  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
}
  
class Comments extends React.Component {
  state = {
    postsClass: 'dn',
    comments: organizecomments(this.props.comments),
    postClass: 'f6 ma0',
  }

  handleClick = () => {
    this.setState( prev => {
      return prev.postsClass === 'db' ? {postsClass: 'dn'} : {postsClass: 'db'}
    }) 
  }

  removeComment = () => {
    this.setState({postClass: 'dn'}) 
  }

  render() {
    return (
      <div>
        <div className="pointer comments-wrapper justify-end flex">
          <div onClick={this.handleClick}>
            <img className='chat-icon' src={chatIcon} />
            <p className='f6 dib ma0'>
              {this.props.comments.length}
            </p>
          </div>
        </div>
        <div className={this.state.postsClass}>
          {this.state.comments.map(bc => {
            if (Array.isArray(bc)) {
              return bc.map(c => <Comment body={c.body} depth={c.depth} className={this.state.postClass} >{c.body}</Comment>)
            } else {
              return <Comment className={this.state.postClass} body={bc.body} depth={bc.depth}>{bc.body}</Comment>
            }
          })}
        </div>
      </div>
    )
  }
}
  
class Comment extends React.Component {
  state = {
    postClass: 'f6 ma0',
  }
  removeComment = () => {
    this.setState({postClass: 'dn'}) 
  }
  render() {
    return <p onClick={this.removeComment} className={this.state.postClass} style={{paddingLeft: `${this.props.depth*10}px`}}><b className='pointer'>x </b>{this.props.body}</p>
  }
}

function organizecomments(comments) {
  comments = comments.filter(c => !(c.depth && !c.parent_id));
  const baseComments = comments.filter(c => !c.depth);
  const subComments = comments.filter(c => c.depth).sort((a, b) => a.depth < b.depth ? -1 : 1);
  
  subComments.forEach(sc => {
    const baseCommentIndex = baseComments.findIndex(bc => {
      if (Array.isArray(bc)) {
        return bc.find(c => c.id === sc.parent_id);
      } else {
        return bc.id === sc.parent_id;
      }
    });
    const baseComment = baseComments[baseCommentIndex]

    if (Array.isArray(baseComment)) {
      baseComment.push(sc);
    } else {
      baseComments.splice(baseCommentIndex, 1, [baseComment, sc]);
    }
  });

  return baseComments
}
