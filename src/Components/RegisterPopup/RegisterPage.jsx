import { IoMdClose } from "react-icons/io";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Dialog } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const textFieldStyles = {
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
};

const passwordFieldStyles = {
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderRight: "0",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "none",
  },
  "& .MuiOutlinedInput-input": {
    color: "white",
    userSelect: "none",
  },
};

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  const [confirmFieldFocused, setConfirmFieldFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCountryCodeChange = (e) => {
    setFormData((prev) => ({ ...prev, countryCode: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/user/account/new`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", data);
      setLoading(false);
      toast.success(data.message);
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
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

          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap gap-4">
              <div className="flex gap-4 w-full mb-2.5">
                <div className="w-full">
                  <TextField
                    id="firstName"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    sx={textFieldStyles}
                  />
                </div>

                <div className="w-full">
                  <TextField
                    id="lastName"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    sx={textFieldStyles}
                  />
                </div>
              </div>

              <div className="w-full">
                <TextField
                  id="email"
                  type="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.email}
                  onChange={handleChange}
                  sx={{ ...textFieldStyles, mb: "10px" }}
                />
              </div>

              <div className="w-full flex gap-4">
                <div className="w-[20%]">
                  <Select
                    value={formData.countryCode}
                    onChange={handleCountryCodeChange}
                    fullWidth
                    sx={textFieldStyles}
                    MenuProps={{
                      PaperProps: { style: { maxHeight: 200 } },
                      disableScrollLock: true,
                    }}
                  >
                    <MenuItem value="+91">+91</MenuItem>
                    <MenuItem value="+1">+1</MenuItem>
                  </Select>
                </div>

                <div className="w-full">
                  <TextField
                    id="phoneNumber"
                    type="tel"
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    sx={textFieldStyles}
                  />
                </div>
              </div>

              <div className="mb-2 w-full">
                <div className="flex items-center mt-2 rounded-sm">
                  <TextField
                    id="password"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    sx={{
                      ...passwordFieldStyles,
                    }}
                  />
                  <div
                    className={`h-[56px] px-3 flex items-center rounded-tr-sm rounded-br-sm border-l-0 border ${
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
                <div className="flex items-center mt-2 rounded-sm">
                  <TextField
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => setConfirmFieldFocused(true)}
                    onBlur={() => setConfirmFieldFocused(false)}
                    sx={{
                      ...passwordFieldStyles,
                    }}
                  />
                  <div
                    className={`h-[56px] px-3 flex items-center rounded-tr-sm rounded-br-sm border-l-0 border ${
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
                type="button"
                className="h-12 w-32 rounded-md focus:outline-none cursor-pointer"
                onClick={() => {
                  onClickCloseRegisterPopUp();
                  handleOpen();
                }}
              >
                Back to Login
              </button>

              <Box sx={{ position: "relative" }}>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  sx={{
                    height: 48,
                    width: 140,
                    minWidth: 150,
                    whiteSpace: "nowrap",
                    borderRadius: 2,
                    background: "linear-gradient(45deg, #fca68a, #fe8381)",
                    color: "black",
                    "&:hover": {
                      background: "linear-gradient(45deg, #fca68a, #fe8381)",
                    },
                    ...(loading && {
                      backgroundColor: green[500],
                    }),
                  }}
                >
                  Create Account
                </Button>

                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: "black",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </Box>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
}

export default RegisterPage;
