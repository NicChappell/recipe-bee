// import dependencies
import React from 'react'

// import custom hooks
import { useCheckboxValue } from '../../helpers/customHooks'

const CommunicationPreferences = () => {
    // custom hook variables
    const coupons = useCheckboxValue(false)
    const newsletter = useCheckboxValue(false)
    const notifications = useCheckboxValue(false)
    const recipes = useCheckboxValue(false)

    return (
        <div className="row">
            <div className="input-field col s12">
                <h4>Communication Preferences</h4>
            </div>
            <div className="col s12">
                <div className="card-panel">
                    <div className="row">
                        <div className="input-field col s6 m4 l3">
                            <label>
                                <input {...coupons} />
                                <span>Coupons</span>
                            </label>
                        </div>
                        <div className="input-field col s6 m4 l3">
                            <label>
                                <input {...newsletter} />
                                <span>Newsletter</span>
                            </label>
                        </div>
                        <div className="input-field col s6 m4 l3">
                            <label>
                                <input {...notifications} />
                                <span>Notifications</span>
                            </label>
                        </div>
                        <div className="input-field col s6 m4 l3">
                            <label>
                                <input {...recipes} />
                                <span>Recipes</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommunicationPreferences
