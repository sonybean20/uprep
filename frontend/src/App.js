import React, { Component } from "react";
import Modal from "./components/Modal";
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
      categoryList: [],
      activeCategory: undefined,
      postList: [],
      activePost: null,
    };
  }
  componentDidMount() {
    if (this.state.logged_in) {
      axios
        .get(
          '/uprep/current_user/',
          {
            headers: {
              Authorization: `JWT ${localStorage.getItem('token')}`
            }
          }
        )
        .then(res => {
          this.setState({ username: res.data.username });
        });
    }
    this.refreshCategories();
    this.refreshPosts();
  }
  handle_login = (e, data) => {
    e.preventDefault();
    axios
      .post('/token-auth/', data)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: res.data.user.username
        });
      })
      .catch(err => {
        localStorage.removeItem('token');
        this.setState({ 
          logged_in: false, 
          username: '' 
        });
        window.alert('Could not login');
        console.log(err);
      });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    axios
      .post('/uprep/users/', data)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: res.data.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  refreshCategories = () => {
    axios
      .get("/api/categories/")
      .then(res => this.setState({ 
        categoryList: res.data,  
        activeCategory: res.data[0].id
      }))
      .catch(err => console.log(err));
  };
  refreshPosts = () => {
    if (this.state.activeCategory === null) return; 
    axios
      .get("/api/posts/")
      .then(res => this.setState({ postList: res.data }))
      .catch(err => console.log(err));
  };
  setCategory = category_id => {
    return this.setState({ activeCategory : category_id });
  };
  renderCategoryList = () => {
    const { categoryList } = this.state;
    const items = []

    for (let i = 0; i < categoryList.length; i++) {
      const c = categoryList[i];
      items.push(
        <span 
          key={c.id}
          onClick={() => this.setCategory(c.id)} 
          className={this.state.activeCategory === c.id ? "active" : ""}
        >
          {c.name}
        </span>
      );
    }
    return (
      <div className="my-5 tab-list">
        {items}
      </div>
    );
  };
  renderPosts = () => {
    const { activeCategory } = this.state;
    const { postList } = this.state;
    const postsInCategory = postList.filter(
      post => post.category === activeCategory
    );
    return postsInCategory.map(post => (
      <li
        key={post.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={"todo-title mr-2"}
          title={post.content}
        >
          {post.title}
        </span>
        <span>
          <button
            onClick={() => this.editPost(post)}
            className="btn btn-secondary mr-2"
          >
            {" "}
            Edit{" "}
          </button>
          <button
            onClick={() => this.handleDelete(post)}
            className="btn btn-danger"
          >
            Delete{" "}
          </button>
        </span>
      </li>
    ));
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`/api/posts/${item.id}/`, item)
        .then(res => this.refreshPosts());
      return;
    }
    axios
      .post("/api/posts/", item)
      .then(res => this.refreshPosts());
  };
  handleDelete = item => {
    axios
      .delete(`/api/posts/${item.id}`)
      .then(res => this.refreshPosts());
  };
  createPost = () => {
    const post = { title: "", category: undefined, content: "" };
    this.setState({ activePost: post, modal: !this.state.modal });
  };
  editPost = post => {
    this.setState({ activePost: post, modal: !this.state.modal });
  };
  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }

    return (
      <main className="content">
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        {form}
        <h3>
          {this.state.logged_in
            ? `Hello, ${this.state.username}`
            : 'Please Log In'}
        </h3>
        <h1 className="text-white text-uppercase text-center my-4">UPREP</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createPost} className="btn btn-primary">
                  New Post
                </button>
              </div>
              {this.renderCategoryList()}
              <ul className="list-group list-group-flush">
                {this.renderPosts()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activePost={this.state.activePost}
            categoryList={this.state.categoryList}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default App;