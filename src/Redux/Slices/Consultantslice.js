import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../Utils/AxiosInstance';

export const fetchConsultants = createAsyncThunk(
  'consultants/fetchConsultants',
  async () => {
    const response = await instance.get('api/consultants');
    return response.data.data;
  }
);

export const fetchConsultantDetails = createAsyncThunk(
  'consultants/fetchConsultantDetails',
  async (id) => {
    try {
      const response = await instance.get(`api/consultants/${id}`);
      return response.data.consultant;
    } catch (error) {
      throw error
    }
  }
);

const consultantSlice = createSlice({
  name: 'consultants',
  initialState: {
    consultants: [],
    ConsultantDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConsultants.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConsultants.fulfilled, (state, action) => {
        state.loading = false;
        state.consultants = action.payload;
        state.error = null
      })
      .addCase(fetchConsultants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchConsultantDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConsultantDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.ConsultantDetails = action.payload;
        state.error = null
      })
      .addCase(fetchConsultantDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default consultantSlice.reducer;