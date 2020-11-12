import React, { Component, createContext } from 'react';
import axios from 'axios'
import { url } from '../urlconfig'
const SmartBrainContext = createContext();

const inital = {
  user: {
    id: '',
    name: ' ',
    email: ' ',
    entries: 0,
    joined: '',

  },
  linkbox: '',
  Imagelink: '',
  box: [],
  loading: false,
  loggedIn: false,
  mod: false,
  message: ''
}
class IndexProvider extends Component {
  state = {
    ...inital
  };

  isUserloggedIn = () => {

    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      this.setState(Object.assign(this.state, { user }));
      this.setState(Object.assign(this.state, { loggedIn: true }));
    }
  }

  handleLogin = (userdetails) => {
    // console.log(userdetails)
    if (userdetails.email) {
      this.setState({
        user: userdetails
      })
      this.setState(Object.assign(this.state, { loggedIn: true }));
    }

    // console.log(localStorage.getItem('user'))
    // if (localStorage.getItem('user')) {

    //   const email = JSON.parse(localStorage.getItem('user')).email;
    //   const rank = JSON.parse(localStorage.getItem('user')).rank
    //   const getTodos = async () => {
    //     try {
    //       const resp = await axios({
    //         method: 'POST',
    //         url: 'http://localhost:3000/userprofile',
    //         data: {
    //           email
    //         },
    //       });

    //       this.setState({
    //         user: { ...resp.data, rank: rank }

    //       })
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };
    //   getTodos();
    // }
  }
  // componentDidMount() {
  //   //console.log(JSON.parse(localStorage.getItem('user')).user.email)

  //   try {
  //     this.handleLogin()
  //   } catch (error) {
  //     localStorage.clear()

  //   }
  // }

  componentDidUpdate(prevProp, prevState) {
    // console.log('componentDidUpdate', prevProp, prevState);

    //
    // console.log(localStorage.getItem('user'))
    if (prevState.mod !== this.state.mod) {
      const getbox = async () => {
        try {
          const resp = await axios({
            method: 'put',
            // headers:a,
            url: `${url}input`,
            data: {
              input: this.state.linkbox,
            },
          });
          // console.log(resp.data.rawData.outputs[0].data.regions);
          if (resp.data) {
            const datas = resp.data.rawData.outputs[0].data.regions;
            //datas.map(img => all.push(img.region_info.bounding_box))
            const image = datas.map((img) => img.region_info.bounding_box);
            this.displaybox(this.imageBoundingBox(image));
            //  this.displaybox(this.imageBoundingBox(all))
            fetch(`${url}image`, {
              method: 'put',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id: this.state.user.id,
              }),
            })
              .then((response) => response.json())
              .then((count) => {
                // console.log(count);
                // console.log(this.state.user.email);
                this.setState(Object.assign(this.state.user, { entries: count }));
                // const localStorage = localStorage.getItem()
                localStorage.setItem('user', JSON.stringify({ ...this.state.user, entries: this.state.user.entries }));
              })
              .catch((err) => console.log(err));
          }

        } catch (error) {
          this.setState({
            message: 'check your Image link or your network'
          })
          setTimeout(() => {
            this.setState({
              message: ''
            })
          }, 3000)

        }
      };
      getbox();

    }
  }


  //This function handle the setting of user state


  handleImageLink = (imageLink) => {
    // console.log(imageLink);
    this.setState({
      linkbox: imageLink,
    });
  };
  //handle Image submit to the back end

  ///image
  displaybox = (box) => {
    // console.log('box', box);
    this.setState({
      box,
    });
  };

  imageBoundingBox = (data) => {
    const Clarifaiface = data;

    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    //  //console.log(width,height)
    return Clarifaiface.map((Cla) => {
      let image = {
        leftcol: Cla.left_col * width,
        topRow: Cla.top_row * height,
        rightcol: width - Cla.right_col * width,
        bottomRow: height - Cla.bottom_row * height,
      };
      //console.log(image)
      return image;
    });
  };

  handleImageSubmit = () => {
    this.setState({
      Imagelink: this.state.linkbox,
      mod: !this.state.mod,
    });
  };

  handleLogout = () => {
    this.setState({
      ...inital
    })

  }


  //End of mage
  render() {
    //console.log(this.state);
    const { handleLoginUser, handleImageSubmit, handleImageLink, handleLogout, handleLogin, isUserloggedIn } = this;
    const { user, Imagelink, box, message, loggedIn } = this.state;
    // console.log(this.state)
    return (
      <SmartBrainContext.Provider
        value={{
          handleLoginUser,
          handleImageSubmit,
          handleImageLink,
          handleLogout,
          handleLogin,
          isUserloggedIn,
          user,
          Imagelink,
          box,
          message,
          loggedIn
        }}
      >
        {this.props.children}
      </SmartBrainContext.Provider>
    );
  }
}

const SmartBrainConsumer = SmartBrainContext.Consumer;
export { SmartBrainConsumer, SmartBrainContext, IndexProvider };
