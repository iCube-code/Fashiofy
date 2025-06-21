import { IoMdClose } from "react-icons/io";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Dialog } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [focused, setFocused] = useState(false);
  const [confirmFieldFocused, setConfirmFieldFocused] = useState(false);

  const handleChange = (event) => {
    setCountryCode(event.target.value);
  };

  const { openRegisterPopUp, onClickCloseRegisterPopUp, handleOpen } =
    useContext(AuthContext);
  return (
    <Dialog
      open={openRegisterPopUp}
      onClose={onClickCloseRegisterPopUp}
      className="dialog"
    >
      <div className=" text-white  flex justify-center items-center rounded-lg ">
        <div className="bg-[linear-gradient(125deg,_#7b356d,_#86584a)] p-5 shadow-lg w-[640px] max-h-[90vh] overflow-y-auto flex flex-col gap-5">
          <div className="flex flex-col items-center">
            <button
              className="place-self-end cursor-pointer"
              onClick={onClickCloseRegisterPopUp}
            >
              <IoMdClose size={30} />
            </button>
            <div>
              <h1 className="text-2xl font-bold mb-2">Register Your Account</h1>
              <p className="text-sm">
                Welcome to our Fashiofy app! We are happy to invite you to
                explore the amazing world of online shopping.
              </p>
            </div>
          </div>

          <form>
            <div className="flex flex-wrap gap-4">
              <div className="flex gap-4 w-full mb-2.5">
                <div className="w-full">
                  <TextField
                    id="firstName"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    required
                    sx={{
                      backgroundColor: "transparent",
                      "& .MuiOutlinedInput-input": {
                        color: "white",
                        fontSize: "14px",
                        userSelect: "none",
                      },
                      "& .MuiInputLabel-outlined": {
                        color: "white",
                        fontSize: "14px",
                        userSelect: "none",
                      },
                    }}
                  />
                </div>

                <div className="w-full">
                  <TextField
                    id="lastName"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    required
                    sx={{
                      backgroundColor: "transparent",
                      "& .MuiOutlinedInput-input": {
                        color: "white",
                        fontSize: "14px",
                        userSelect: "none",
                      },
                      "& .MuiInputLabel-outlined": {
                        color: "white",
                        fontSize: "14px",
                        userSelect: "none",
                      },
                    }}
                  />
                </div>
              </div>

              <div className="w-full">
                <TextField
                  id="email"
                  type="email"
                  label="Email"
                  variant="outlined"
                  required
                  fullWidth
                  sx={{
                    mb: "10px",
                    backgroundColor: "transparent",
                    "& .MuiOutlinedInput-input": {
                      color: "white",
                      fontSize: "14px",
                      userSelect: "none",
                    },
                    "& .MuiInputLabel-outlined": {
                      color: "white",
                      fontSize: "14px",
                      userSelect: "none",
                    },
                  }}
                />
              </div>

              <div className=" w-full">
                <div className="flex gap-4">
                  <div className="w-[20%]">
                    <Select
                      labelId="country-code-select-label"
                      id="country-code"
                      value={countryCode}
                      onChange={handleChange}
                      fullWidth
                      sx={{
                        backgroundColor: "transparent",
                        "& .MuiOutlinedInput-input": {
                          color: "white",
                          fontSize: "14px",
                          userSelect: "none",
                        },
                        "& .MuiInputLabel-outlined": {
                          color: "white",
                          fontSize: "14px",
                          userSelect: "none",
                        },
                      }}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 200,
                            overflowY: "auto",
                          },
                        },
                        disableScrollLock: true,
                      }}
                    >
                      <MenuItem value="+91">+91</MenuItem>
                    </Select>
                  </div>

                  <div className="w-full">
                    <TextField
                      id="phone-number"
                      type="tel"
                      label="Phone Number"
                      variant="outlined"
                      fullWidth
                      required
                      sx={{
                        backgroundColor: "transparent",
                        "& .MuiOutlinedInput-input": {
                          color: "white",
                          fontSize: "14px",
                          userSelect: "none",
                        },
                        "& .MuiInputLabel-outlined": {
                          color: "white",
                          fontSize: "14px",
                          userSelect: "none",
                        },
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-2 w-full">
                <div className="flex items-center mt-2 rounded-sm ">
                  <TextField
                    id="password"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    variant="outlined"
                    fullWidth
                    required
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "white",
                      },
                      "& .MuiOutlinedInput-root": {
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      },
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          borderRight: "0",
                        },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "none",
                      },
                      "& .MuiOutlinedInput-input": {
                        color: "white",
                        userSelect: "none",
                      },
                      "& .MuiInputLabel-outlined": {
                        color: "white",
                        userSelect: "none",
                      },
                    }}
                  />

                  <div
                    className={`h-[56px] px-3 flex items-center rounded-tr-sm rounded-br-sm border-l-0 border  ${
                      focused
                        ? "border-[#1976d2] border-2"
                        : "border-[rgba(0,0,0,0.23)]"
                    }`}
                  >
                    <button
                      type="button"
                      className="text-white focus:outline-none cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-2 w-full">
                <div className="flex items-center mt-2 rounded-sm ">
                  <TextField
                    id="password"
                    type={showPassword ? "text" : "password"}
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    required
                    onFocus={() => setConfirmFieldFocused(true)}
                    onBlur={() => setConfirmFieldFocused(false)}
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "white",
                      },
                      "& .MuiOutlinedInput-root": {
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      },
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          borderRight: "0",
                        },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "none",
                      },
                      "& .MuiOutlinedInput-input": {
                        color: "white",
                        userSelect: "none",
                      },
                      "& .MuiInputLabel-outlined": {
                        color: "white",
                        userSelect: "none",
                      },
                    }}
                  />

                  <div
                    className={`h-[56px] px-3 flex items-center rounded-tr-sm rounded-br-sm border-l-0 border  ${
                      confirmFieldFocused
                        ? "border-[#1976d2] border-2"
                        : "border-[rgba(0,0,0,0.23)]"
                    }`}
                  >
                    <button
                      type="button"
                      className="text-white focus:outline-none cursor-pointer"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="h-12 w-32  rounded-md  focus:outline-none cursor-pointer"
                onClick={() => {
                  onClickCloseRegisterPopUp();
                  handleOpen();
                }}
              >
                Back to Login
              </button>
              <button
                type="submit"
                className="h-12 w-32  rounded-md bg-blue-800  focus:outline-none cursor-pointer"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
}

export default RegisterPage;
