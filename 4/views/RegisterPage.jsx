import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react"
import "../src/App.css"
const url = 'http://localhost:3000/users'
import Axios from 'axios'

export default function RegisterPage() {
    const navigate = useNavigate()
    const [errorMessage, setErrorMesssage] = useState({
        message: ""
    })
    const [input, setInput] = useState({
        companyName: "",
        ceoFirstName: "",
        ceoLastName: "",
        password: "",
        confirmPassword: "",
        checkBox: false
    })
    const [phoneNumber, setPhoneNumber] = useState({
        phoneNumber: ""
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleOnChange = (e) => {
        const { name, value, type, checked } = e.target;
        setInput((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
        setErrorMesssage({ message: "" })
    }

    const handlePhoneInput = (e) => {
        let formattedPhoneNumber = e.target.value.replace(/\D/g, '')

        if (formattedPhoneNumber.charAt(0) == "0") {
            formattedPhoneNumber = formattedPhoneNumber.charAt(1)
        }
        if (formattedPhoneNumber.length >= 3) {
            formattedPhoneNumber =
                formattedPhoneNumber.substring(0, 3) +
                '-' +
                formattedPhoneNumber.substring(3);
        }
        if (formattedPhoneNumber.length >= 8) {
            formattedPhoneNumber =
                formattedPhoneNumber.substring(0, 8) +
                '-' +
                formattedPhoneNumber.substring(8);
        }

        if (e.nativeEvent.inputType === 'deleteContentBackward' && formattedPhoneNumber.length === 4) {
            formattedPhoneNumber = formattedPhoneNumber.substring(0, 3);
        } else if (e.nativeEvent.inputType === 'deleteContentBackward' && formattedPhoneNumber.length === 9) {
            formattedPhoneNumber = formattedPhoneNumber.substring(0, 8);
        }

        setErrorMesssage({ message: "" })
        setPhoneNumber({
            phoneNumber: formattedPhoneNumber,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const companyName = input.companyName;
        const companyNamePattern = /^[A-Za-z0-9\s]{3,}$/;

        const fixPhoneNumber = "0" + phoneNumber.phoneNumber.split("-").join("")

        if (!input.companyName || !input.ceoFirstName || !input.ceoLastName || !input.password || !input.confirmPassword) {
            setErrorMesssage({ message: "Please fill all the field!" })
        } else if (!companyNamePattern.test(companyName)) {
            setErrorMesssage({ message: "Company name must be at least 3 characters long, no symbols allowed, but numbers are allowed." });
        } else if (input.ceoFirstName.length < 3 || input.ceoLastName.length < 3) {
            setErrorMesssage({ message: "Ceo first name and last name must be at least 3 characters long." })
        } else if (fixPhoneNumber.length < 9) {
            setErrorMesssage({ message: "Phone number must be at least 9 numbers" })
        } else if (input.password !== input.confirmPassword) {
            setErrorMesssage({ message: "Please make sure the password is same" })
        } else if (!input.checkBox) {
            setErrorMesssage({ message: "Please check the terms & Conditions" })
        } else {
            Axios.post(url, {
                companyName: input.companyName,
                ceoName: input.ceoFirstName + " " + input.ceoLastName,
                phoneNumber: fixPhoneNumber,
                password: input.password
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(() => {
                    if (errorMessage.message) {
                        throw new Error("Something Went Wrong")
                    }
                    setInput({
                        companyName: "",
                        ceoFirstName: "",
                        ceoLastName: "",
                        password: "",
                        confirmPassword: "",
                        checkBox: false
                    })
                    setPhoneNumber({
                        phoneNumber: ""
                    })
                    navigate('/')
                })
                .catch(err => {
                    console.log(errorMessage.message)
                })
        }
    }

    return (
        <>
            <div className='main-page py-5'>
                <h1 className='text-3xl text-center text-black font-bold'>Register Your Account</h1>
                <div className='flex flex-col items-center mt-10'>
                    {errorMessage.message && (
                        <div className="alert alert-error w-full max-w-xs h-fit">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" onClick={() => {
                                setErrorMesssage({
                                    message: ""
                                })
                            }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <div className="text-red-500 mt-2">{errorMessage.message}</div>
                        </div>
                    )}

                    <form className="w-full max-w-xs" onSubmit={handleSubmit}>
                        <div className='mt-5 form-control'>
                            <label className='label label-text'>Company Name</label>
                            <input name='companyName' type="text" placeholder="Type Here" className="input w-full" value={input.companyName} onChange={handleOnChange} />
                        </div>
                        <div className='mt-5 form-control'>
                            <label className='label label-text'>CEO Name</label>
                            <div className="flex space-x-4">
                                <input name='ceoFirstName' type="text" placeholder="First Name" className="input w-1/2" value={input.ceoFirstName} onChange={handleOnChange} />
                                <input name='ceoLastName' type="text" placeholder="Last Name" className="input w-1/2" value={input.ceoLastName} onChange={handleOnChange} />
                            </div>
                        </div>
                        <div className='mt-5 form-control'>
                            <label className='label label-text'>Phone Number</label>
                            <div className="flex items-center">
                                <button className='btn' type='button'>+62</button>
                                <input
                                    name='phoneNumber'
                                    type="text"
                                    placeholder="859-xxxx-xxxx"
                                    className="input w-full"
                                    value={phoneNumber.phoneNumber}
                                    onChange={handlePhoneInput}
                                />
                            </div>
                        </div>
                        <div className='form-control mt-5'>
                            <div className='form-control mt-5'>
                                <label className='label label-text'>Password</label>
                                <div className="password-input-container flex items-center">
                                    <input
                                        name='password'
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Type Here"
                                        className="input w-full"
                                        value={input.password}
                                        onChange={handleOnChange}
                                    />
                                    <button
                                        className="password-toggle-button btn"
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className='form-control mt-5'>
                            <label className='label label-text'>Confirm Your Password</label>
                            <div className="password-input-container flex items-center">
                                <input
                                    name='confirmPassword'
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Type Here"
                                    className="input w-full"
                                    value={input.confirmPassword}
                                    onChange={handleOnChange}
                                />
                                <button
                                    className="password-toggle-button btn"
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>
                        <div className="form-control mt-5">
                            <label className="label cursor-pointer">
                                <span className="label-text">
                                    <Link style={{ color: 'blue', textDecoration: 'underline' }} to={"https://www.elefin.id/"}>
                                        Agree Terms & Conditions
                                    </Link>
                                </span>
                                <input type="checkbox" className="checkbox" checked={input.checkBox} onChange={handleOnChange} name='checkBox' style={{ borderWidth: '2px', borderColor: 'black' }} />
                            </label>
                        </div>
                        <div className='mt-5'>
                            <button className="btn btn-outline text-black input-button" type='submit'>Submit</button>
                        </div>
                    </form>
                </div >
            </div >
        </>
    )
}