import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, editSingleProduct} from '../store/product'
import {Form, Grid, Card, Button} from 'semantic-ui-react'
import AddProductCategory from './AddProductCategory'
import {Link} from 'react-router-dom'

class EditProduct extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleAvailability = this.toggleAvailability.bind(this)
    this.name = React.createRef()
    this.price = React.createRef()
    this.size = React.createRef()
    this.flavor = React.createRef()
    this.description = React.createRef()
    this.inventory = React.createRef()
    this.availability = React.createRef()
  }

  componentDidMount() {
    /**
     * initializes project with the corresponding id provided in the url
     * *****
     * TODO:
     * - prevent re-render when state is already set correctly or updated correctly
     */
    this.props.initializeProduct()
  }

  // allows default values to render correctly
  componentDidUpdate(prevProps) {
    if (prevProps.productToEdit !== this.props.productToEdit) {
      const {productToEdit} = this.props
      this.name.current.value = productToEdit.name
      this.price.current.value = productToEdit.price
      this.size.current.value = productToEdit.size
      this.flavor.current.value = productToEdit.flavor
      this.description.current.value = productToEdit.description
      this.inventory.current.value = productToEdit.inventory
      this.availability.current.value = productToEdit.availability
    }
  }

  // update all fields except availability
  handleSubmit(evt) {
    // prevent refresh
    evt.preventDefault()
    // extract the needed tags
    const {name, price, size, flavor, description, inventory} = evt.target
    // create argument for our thunk to pass onto axios' request as a body
    const editField = {
      name: name.value,
      price: price.value,
      size: size.value,
      flavor: flavor.value,
      description: description.value,
      inventory: Number(inventory.value)
    }
    // just thunk it
    this.props.editProduct(editField)
  }

  toggleAvailability() {
    this.props.editProduct({
      ...this.props.productToEdit,
      available: !this.props.productToEdit.available
    })
  }

  render() {
    const productToEdit = this.props.productToEdit
    return (
      <div>
        <h3>
          Edit
          <Link to={`products/${productToEdit.id}`}>{` ${
            productToEdit.name
          }`}</Link>
        </h3>
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label htmlFor="name">Name:</label>
              <input type="text" name="name" id="name" ref={this.name} />
            </Form.Field>
            <Form.Field>
              <label htmlFor="price">Price:</label>
              <input type="text" name="price" id="price" ref={this.price} />
            </Form.Field>
            <Form.Field>
              <label htmlFor="size">Size:</label>
              <input type="text" name="size" id="size" ref={this.size} />
            </Form.Field>
            <Form.Field>
              <label htmlFor="flavor">Flavor:</label>
              <input type="text" name="flavor" id="flavor" ref={this.flavor} />
            </Form.Field>
            <Form.Field>
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                name="description"
                id="description"
                ref={this.description}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="inventory">Inventory:</label>
              <input
                type="number"
                min="0"
                name="inventory"
                id="inventory"
                ref={this.inventory}
              />
            </Form.Field>
            <br />
            <Button type="submit">Edit Product</Button>
            <Form.Field>
              <label htmlFor="availability">Availability:</label>
              {/** TODO: display default value and updated value for button text */}
              <input
                type="button"
                name="availability"
                id="availability"
                ref={this.availability}
                onClick={this.toggleAvailability}
              />
            </Form.Field>
            <Form.Field>
              <AddProductCategory product={productToEdit} />
            </Form.Field>
          </Form>
        </Card>
      </div>
    )
  }
}

const mapState = state => ({
  productToEdit: state.singleProduct
})

const mapDispatch = (dispatch, ownProps) => ({
  initializeProduct: () =>
    dispatch(fetchSingleProduct(ownProps.match.params.id)),
  editProduct: editField =>
    dispatch(editSingleProduct(ownProps.match.params.id, editField))
})

export default connect(mapState, mapDispatch)(EditProduct)
