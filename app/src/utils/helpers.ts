import { useState } from 'react';
import instance from 'axios';

export const axios = instance.create({
	baseURL: process.env.REACT_APP_API_ENDPOINT,
	headers: {
		'Content-Type': 'application/json',
		'api-key': process.env.REACT_APP_API_KEY
	}
});
