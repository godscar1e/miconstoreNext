'use client';
import React, { useState, useEffect, useCallback } from "react";
import { getUserData } from '@/components/getUserData';
import Image from 'next/image';
import axios from "axios";
import Header from '@/components/Header/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { SessionProvider, useSession } from 'next-auth/react';
import SessionLogger from '@/components/SessionLogger';

import NumerologyInfo from "@/components/Numerology/NumerologyCourse";

export default function NumerologyPage() {

    return (
        <div >
            <Header />
            <SessionProvider>
                <NumerologyInfo />
            </SessionProvider>
        </div>
    );
}
