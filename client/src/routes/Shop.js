// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

// import data
import merch from '../data/merch.json'

const Color = props => {
    // destructure props
    const {
        color,
        handleClick,
        selectedColor
    } = props

    // destructure color
    const {
        name,
        photos
    } = color

    return (
        <img
            alt={name}
            className={`thumbnail ${name === selectedColor.name ? 'active' : ''}`}
            name={name}
            onClick={handleClick}
            src={photos[0]}
        />
    )
}

Color.propTypes = {
    color: PropTypes.object,
    handleClick: PropTypes.func,
    selectedColor: PropTypes.object
}

const FitType = props => {
    // destructure props
    const {
        name,
        handleClick,
        selectedFitType
    } = props

    return (
        <button
            className={`btn-flat btn ${name === selectedFitType.name ? 'active' : ''}`}
            name={name}
            onClick={handleClick}
        >
            {name}
        </button>
    )
}

FitType.propTypes = {
    name: PropTypes.string,
    handleClick: PropTypes.func,
    selectedFitType: PropTypes.object
}

const Styles = props => {
    // destructure props
    const {
        name,
        handleClick,
        selectedStyle
    } = props

    return (
        <button
            className={`btn-flat btn ${name === selectedStyle.name ? 'active' : ''}`}
            name={name}
            onClick={handleClick}
        >
            {name}
        </button>
    )
}

Styles.propTypes = {
    name: PropTypes.string,
    handleClick: PropTypes.func,
    selectedStyle: PropTypes.object
}

const Photos = ({ photos }) => {
    // state hook variables
    const [currIndex, setCurrIndex] = useState(0)

    const handleBackClick = () => {
        if (currIndex - 1 >= 0) {
            setCurrIndex(currIndex - 1)
        } else {
            setCurrIndex(photos.length - 1)
        }
    }

    const handleForwardClick = () => {
        if (currIndex + 1 === photos.length) {
            setCurrIndex(0)
        } else {
            setCurrIndex(currIndex + 1)
        }
    }

    if (photos.length === 1) {
        return (
            <div className="card-image shop-image">
                <img src={photos[0]} alt="" />
            </div>
        )
    }
    return (
        <div className="card-image shop-image">
            <div className="gallery">
                <button className="btn-flat btn-large transparent back" onClick={handleBackClick}>
                    <i className="material-icons">chevron_left</i>
                </button>
                <img src={photos[currIndex]} alt="" />
                <button className="btn-flat btn-large transparent forward" onClick={handleForwardClick}>
                    <i className="material-icons">chevron_right</i>
                </button>
            </div>
        </div>
    )
}

Photos.propTypes = { photos: PropTypes.array }

const Price = props => {
    // destructure props
    const {
        discount,
        listPrice
    } = props

    // destructure discount
    const {
        discountPrice,
        discountPercent
    } = discount

    if (isEmpty(discount)) {
        return (
            <div className="price">
                <div className="details">
                    Price:
                    <span className="list-price">
                        ${listPrice}
                    </span>
                </div>
            </div>
        )
    }
    return (
        <div className="price">
            <div className="details">
                Price:
                <span className="list-price strike">
                    ${listPrice}
                </span>
                <span className="discount-price">
                    ${discountPrice}
                </span>
            </div>
            <span className="discount">
                <i className="right material-icons">loyalty</i>
                {discountPercent}% OFF
            </span>
        </div>
    )
}

Price.propTypes = {
    discount: PropTypes.object,
    listPrice: PropTypes.string
}

const ProductVariant = props => {
    // destructure props
    const {
        productName,
        productVariant
    } = props

    // destructure product variant
    const {
        name,
        listPrice,
        discount,
        styles
    } = productVariant

    // state hook variables
    const [colors, setColors] = useState([])
    const [customId, setCustomId] = useState('')
    const [dp, setDp] = useState('')
    const [photos, setPhotos] = useState([])
    const [fitTypes, setFitTypes] = useState([])
    const [link, setLink] = useState('')
    const [selectedColor, setSelectedColor] = useState({})
    const [selectedFitType, setSelectedFitType] = useState({})
    const [selectedStyle, setSelectedStyle] = useState({})

    const handleColorClick = e => {
        // destructure event
        const { name } = e.target

        // update state
        setSelectedColor(colors.find(color => color.name === name))
    }

    const handleFitTypeClick = e => {
        // destructure event
        const { name } = e.target

        // update state
        setSelectedFitType(fitTypes.find(fitType => fitType.name === name))
    }

    const handleStyleClick = e => {
        // destructure event
        const { name } = e.target

        // update state
        setSelectedStyle(styles.find(style => style.name === name))
    }

    // update state when custom id or dp changes
    useEffect(() => {
        setLink(`https://www.amazon.com/dp/${dp}?customId=${customId}`)
    }, [customId, dp])

    // update state when selected color changes
    useEffect(() => {
        if (!isEmpty(selectedColor)) {
            setCustomId(selectedColor.customId)
            setPhotos(selectedColor.photos)
        }
    }, [selectedColor])

    // update state when selected fit type changes
    useEffect(() => {
        if (!isEmpty(selectedFitType)) {
            setColors(selectedFitType.colors)
            setSelectedColor(selectedFitType.colors[0])
        }
    }, [selectedFitType])

    // update state when selected style changes
    useEffect(() => {
        if (!isEmpty(selectedStyle)) {
            setDp(selectedStyle.dp)
            setFitTypes(selectedStyle.fitTypes)
            setSelectedFitType(selectedStyle.fitTypes[0])
        }
    }, [selectedStyle])

    // update state when component mounts
    useEffect(() => {
        setSelectedStyle(styles[0])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="col s12 m6 l4">
            <div className="card product-variant">
                <Photos photos={photos} />
                <div className="card-content shop-content">
                    <h5>{productName} {name}</h5>
                    <Price
                        discount={discount}
                        listPrice={listPrice}
                    />
                    <p className="fit-type">
                        Fit Type:
                    </p>
                    <div className="fit-type-options">
                        {fitTypes.map(fitType => {
                            return (
                                <FitType
                                    key={fitType.id}
                                    name={fitType.name}
                                    handleClick={handleFitTypeClick}
                                    selectedFitType={selectedFitType}
                                />
                            )
                        })}
                    </div>
                    <p className="colors">Colors:</p>
                    <div className="colors-options">
                        {colors.map(color => {
                            return (
                                <Color
                                    color={color}
                                    key={color.id}
                                    handleClick={handleColorClick}
                                    selectedColor={selectedColor}
                                />
                            )
                        })}
                    </div>
                    <p className="styles">Styles:</p>
                    <div className="styles-options">
                        {styles.map(style => {
                            return (
                                <Styles
                                    key={style.id}
                                    name={style.name}
                                    handleClick={handleStyleClick}
                                    selectedStyle={selectedStyle}
                                />
                            )
                        })}
                    </div>
                </div>
                <div className="card-action shop-action">
                    <a className="btn-flat amber lighten-2 black-text" href={link} rel="noopener noreferrer" target="_blank">Buy on Amazon</a>
                </div>
            </div>
        </div>
    )
}

ProductVariant.propTypes = {
    productName: PropTypes.string,
    productVariant: PropTypes.object
}

const Category = ({ category }) => {
    // destructure category
    const { products } = category

    // state hook variables
    const [productVariants, setProductVariants] = useState([])

    // update state when products changes
    useEffect(() => {
        const productVariants = []

        products.forEach(product => {
            // destructure product
            const {
                name,
                variants
            } = product

            variants.forEach(variant => {
                const productVariant = {
                    name,
                    variant
                }

                productVariants.push(productVariant)
            })
        })

        setProductVariants(productVariants)
    }, [products])

    return (
        <div className="row category">
            {productVariants.map(productVariant => {
                // destructure product variant
                const {
                    name,
                    variant
                } = productVariant

                return (
                    <ProductVariant
                        key={variant.id}
                        productName={name}
                        productVariant={variant}
                    />
                )
            })}
        </div>
    )
}

Category.propTypes = { category: PropTypes.object }

const Shop = () => {
    return (
        <div className="container" id="shop">
            {merch.map(category => (
                <Category
                    key={category.id}
                    category={category}
                />
            ))}
        </div>
    )
}

export default Shop
