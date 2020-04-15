// import dependencies
const express = require('express')

// instantiate a new Router class
const router = express.Router()

// @route:  GET api/v1/uploads/
// @desc:   Return all uploads
// @access: Public
router.get('/', (req, res) => {
    User.find({})
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json(err))
})

// @route:  DELETE api/v1/users/:userId
// @desc:   Delete user
// @access: Public
router.delete('/:userId', (req, res) => {
    // destructure request params
    const { userId } = req.params

    // find user and delete
    User.findByIdAndDelete(userId)
        .then(() => res.status(200).json({ message: 'successfully deleted user' }))
        .catch(err => res.status(400).json({ message: 'falied to delete user', err }))
})

// @route:  GET api/v1/users/:userId
// @desc:   Return user
// @access: Public
router.get('/:userId', (req, res) => {
    // destructure request params
    const { userId } = req.params

    // find user
    User.findById(userId)
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json(err))
})

// @route:  PUT api/v1/users/:userId
// @desc:   Update user
// @access: Public
router.put('/:userId', (req, res) => {
    // destructure request params
    const { userId } = req.params

    // find user and update
    User.findByIdAndUpdate(userId, { ...req.body }, { new: true })
        .then(user => res.status(200).json({ message: 'successfully updated user', user }))
        .catch(err => res.status(400).json({ message: 'falied to update user', err }))
})

// @route:  POST api/v1/users/sign-in
// @desc:   Sign in user and return JWT token
// @access: Public
router.post('/sign-in', (req, res) => {
    // destructure validateSignInInput()
    const {
        errors,
        isValid
    } = validateSignInInput(req.body)

    // check validation
    if (!isValid) {
        return res
            .status(400)
            .json(errors)
    }

    // destructure request body
    const {
        email,
        password
    } = req.body

    User.findOne({ email }).then(user => {
        // check for existing user
        if (!user) {
            return res
                .status(404)
                .json({ email: 'Email not found' })
        }

        // check password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                // matched user
                if (isMatch) {
                    // create jwt payload
                    const payload = {
                        id: user.id,
                        address1: user.address1,
                        address2: user.address2,
                        city: user.city,
                        email: user.email,
                        firstName: user.firstName,
                        fullName: user.fullName,
                        lastName: user.lastName,
                        password: user.password,
                        postalCode: user.postalCode,
                        slug: user.slug,
                        state: user.state,
                        username: user.username
                    }

                    // 1 year in seconds
                    const oneYear = 31556926

                    // sign token
                    jwt.sign(
                        payload,
                        secretOrKey,
                        { expiresIn: oneYear },
                        (err, token) => {
                            return res
                                .status(200)
                                .json({ token: `Bearer ${token}` })
                        }
                    )
                }
                // unmatched user
                else {
                    return res
                        .status(400)
                        .json({ password: 'Password incorrect' })
                }
            })
            .catch(err => console.log(err))
    })
})

// @route:  POST api/v1/users/sign-up
// @desc:   Sign up new user
// @access: Public
router.post('/sign-up', (req, res) => {
    // destructure validateSignUpInput()
    const {
        errors,
        isValid
    } = validateSignUpInput(req.body)

    // check validation
    if (!isValid) {
        return res
            .status(400)
            .json(errors)
    }

    // destructure request body
    const {
        address1,
        address2,
        city,
        email,
        firstName,
        lastName,
        password,
        postalCode,
        state,
        username
    } = req.body

    // check for existing email
    User.findOne({ email }).then(user => {
        if (user) {
            return res
                .status(400)
                .json({ email: 'Email already exists' })
        }

        // check for existing username
        User.findOne({ username }).then(user => {
            if (user) {
                return res
                    .status(400)
                    .json({ username: 'Username already exists' })
            }

            // instantiate new User object 
            const newUser = new User({
                address1,
                address2,
                city,
                email,
                firstName,
                fullName: `${firstName} ${lastName}`,
                lastName,
                password,
                postalCode,
                slug: `${firstName.toLowerCase()}-${lastName.toLowerCase()}`,
                state,
                username
            })

            // hash password before saving to database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err
                    newUser.password = hash
                    newUser.save()
                        .then(user => res.status(200).json(user))
                        .catch(err => console.log(err))
                })
            })
        })
    })
})

// export router
module.exports = router
