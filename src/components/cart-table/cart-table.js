import React from 'react';
import './cart-table.scss';
import { connect } from 'react-redux';
import { deleteFromCart, AddToItem, RemoveFromItem } from '../../actions';


const CartTable = ({ items, deleteFromCart, AddToItem, RemoveFromItem }) => {
    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {
                    items.map(item => {
                        const { title, price, url, id, amount } = item;
                        return (
                            <div key={id} className="cart__item">
                                <img src={url} className="cart__item-img" alt="Cesar salad"></img>
                                <div className="cart__item-title">{title}</div>
                                <div className="cart__item-price">{price}$</div>
                                <div className="cart__item-add__remove">
                                    <span onClick={() => RemoveFromItem(id)} className="cart__item-add__remove-plus__minus"><i class="fas fa-minus"></i></span>
                                    <span className="cart__item-add__remove-counter">{amount}</span>
                                    <span onClick={() => AddToItem(id)} className="cart__item-add__remove-plus__minus"><i class="fas fa-plus"></i></span>
                                </div>
                                <div onClick={() => deleteFromCart(id)} className="cart__close">&times;</div>
                            </div>
                        )
                    })
                }



            </div>
        </>
    );
};

const mapStateToProps = ({ items, amount }) => {
    return {
        items,
        amount
    }
}

const mapDispatchToProps = {
    deleteFromCart,
    AddToItem,
    RemoveFromItem
}

export default connect(mapStateToProps, mapDispatchToProps)(CartTable);