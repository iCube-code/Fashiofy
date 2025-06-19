import { IoMdClose } from "react-icons/io";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

function RegisterPage({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");

  const handleChange = (event) => {
    setCountryCode(event.target.value);
  };

  return (
    <div className="fixed inset-0 text-white bg-black/70 flex justify-center items-center">
      <div className="bg-[linear-gradient(125deg,_#7b356d,_#86584a)] p-5 rounded-lg shadow-lg w-[640px] max-h-[90vh] overflow-y-auto flex flex-col gap-5">
        <div className="flex flex-col items-center">
          <button className="place-self-end cursor-pointer" onClick={onClose}>
            <IoMdClose size={30} />
          </button>
          <div>
            <h1 className="text-lg font-bold mb-2">Register Your Account</h1>
            <p className="text-sm">
              Welcome to our Fashiofy app! We are happy to invite you to explore
              the amazing world of online shopping.
            </p>
          </div>
        </div>

        <form className="flex flex-wrap gap-4">
          <div className="mb-2 w-[48%]">
            <InputLabel
              htmlFor="firstName"
              className="text-white mb-1"
              style={{ color: "white" }}
            >
              First Name
            </InputLabel>
            <TextField
              id="firstName"
              label="Enter Your First Name"
              variant="outlined"
              fullWidth
              required
              sx={{
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
              }}
            />
          </div>

          <div className="mb-2 w-[48%]">
            <InputLabel
              htmlFor="lastName"
              className="text-white mb-1"
              style={{ color: "white" }}
            >
              Last Number
            </InputLabel>
            <TextField
              id="lastName"
              label="Enter Your Last Name"
              variant="outlined"
              fullWidth
              required
              sx={{
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
              }}
            />
          </div>

          <div className="mb-2 w-full">
            <InputLabel
              htmlFor="email"
              className="text-white mb-1"
              style={{ color: "white" }}
            >
              Email
            </InputLabel>
            <TextField
              id="email"
              type="email"
              label="Enter Your Email"
              variant="outlined"
              fullWidth
              required
              sx={{
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
              }}
            />
          </div>

          <div className="mb-2 w-full">
            <div className="flex gap-4">
              <div className="w-[30%]">
                <InputLabel
                  id="country-code-select-label"
                  className="text-white mb-1"
                  style={{ color: "white" }}
                >
                  Country Code
                </InputLabel>
                <Select
                  labelId="country-code-select-label"
                  id="country-code"
                  value={countryCode}
                  onChange={handleChange}
                  fullWidth
                  sx={{
                    color: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },

                    "& .MuiSvgIcon-root": {
                      color: "white",
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

              <div className="w-[70%]">
                <InputLabel
                  htmlFor="phone-number"
                  className="text-white mb-1"
                  style={{ color: "white" }}
                >
                  Phone Number
                </InputLabel>
                <TextField
                  id="phone-number"
                  type="tel"
                  label="Enter Your Phone Number"
                  variant="outlined"
                  fullWidth
                  required
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "white",
                      },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mb-2 w-full">
            <InputLabel
              htmlFor="password"
              className="text-white mb-1"
              style={{ color: "white" }}
            >
              Password
            </InputLabel>

            <div className="flex items-center  rounded-sm mt-2">
              <TextField
                id="password"
                type={showPassword ? "text" : "password"}
                label="Enter Your Password"
                variant="outlined"
                fullWidth
                required
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                }}
              />
              <button
                type="button"
                className="px-3 text-white  focus:outline-none cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
          </div>

          <div className="mb-2 w-full">
            <InputLabel
              htmlFor="confirmPassword"
              className="text-white mb-1"
              style={{ color: "white" }}
            >
              Confirm Password
            </InputLabel>

            <div className="flex items-center  rounded-sm mt-2">
              <TextField
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm Your Password"
                variant="outlined"
                fullWidth
                required
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                }}
              />
              <button
                type="button"
                className="px-3  focus:outline-none text-white cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
          </div>
        </form>

        <div className="flex justify-end">
          <button className="h-12 w-32  rounded-md bg-blue-800  focus:outline-none cursor-pointer">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
