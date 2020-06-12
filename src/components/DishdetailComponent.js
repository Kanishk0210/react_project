import React, {Component} from 'react';
import {Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem,
        Modal, ModalHeader, ModalBody, Button, Col, Row, Label} from 'reactstrap'
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';       
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseURL';   
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

function RenderDish({dish}) {
    if(dish!=null)
        return(  
            <div className="col-12 col-md-5 m-1">
                <FadeTransform in
                transformProps={{
                    exitTransform: 'scale(0.5) translatY(-50%)'
                }}>
                    <Card>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardTitle>
                                {dish.name}
                            </CardTitle>
                            <CardText>
                                {dish.description}
                            </CardText>
                        </CardBody>
                    </Card> 
                </FadeTransform>
            </div>                                
        );
    else
        return(
            <div></div>                                              
        );            
}


function RenderComments({comments, postComment, dishId}) {
    if(comments!=null)
        return(
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in>

                        {comments.map((comment) => {
                            return(
                                <Fade in>
                                    <li key={comment.id}>
                                        <p> {comment.comment} </p>
                                        <p>-- {comment.author} , {Intl.DateTimeFormat('en-US', {year:'numeric', month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>                                                          
                                    </li>
                                </Fade>                            
                            );   
                        })}            
                    </Stagger>                                                                   
                </ul>            
                <CommentForm dishId={dishId} postComment={postComment}/>                                   
            </div>                
        );
    else
        return(
            <div></div>
        );
}

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {            
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen
        });         
    }

    handleSubmitComment(values) {
        console.log("Current state is: "+ JSON.stringify(values));
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    render() {
        return(         
            <div>
                <Button outline onClick={this.toggleModal} color="secondary">
                    <span className="fa fa-pencil fa-lg" ></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmitComment(values)}>
                            <Row className="form-group m-3">                                                                        
                                <Label htmlFor="rating">Rating</Label>                                                                                                              
                                <Control.select model=".rating" name="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>                                            
                                </Control.select>
                                
                            </Row>
                            <Row className="from-group m-3">
                                <Label htmlFor="author">Your Name</Label>                                    
                                    <Control.text model=".author" name="author" className="form-control"
                                    validators={{
                                        minLength: minLength(3), maxLength: maxLength(15)
                                    }}/> 
                                    <Errors
                                    className="text-danger" model=".name" 
                                    show="touched" 
                                    messages={{                                            
                                        minLength: 'Must be greater than 2 character',
                                        maxLength: 'Must be less than 15 characters'
                                    }} />                                                                                                                    
                            </Row>
                            <Row className="form-group m-3">
                                <Label htmlFor="comment">Comment</Label>                                    
                                    <Control.textarea model=".comment" name="comment" className="form-control"
                                        rows="6">                                            
                                    </Control.textarea>                                    
                            </Row>
                            <Button className="ml-3" type="submit" color="primary" >Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>                 
            </div>                           
        );
    }    
}

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

const DishDetail = (props) => {
    if(props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if(props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{ props.errMess }</h4>
                </div>
            </div>
        );
    }

    else if(props.dish!=null){
        return(
            <div>                
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu"> Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active> {props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>                
                    <div className="row">
                        <RenderDish dish={props.dish}/>  
                                                            
                        <RenderComments comments={props.comments}
                                        dishId={props.dish.id} postComment={props.postComment} />                                                                                                            
                    </div>                    
                </div>  
            </div>            
        );
    }
    else
        return(
            <div></div>
        );        
                                 
}


export default DishDetail;