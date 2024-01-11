const OwnerIcon: React.FC<{ color: string }> = ({ color }) => (
    <svg fill={color} height="30px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M454.313,249.708L512,206.991L462.136,38.939l-256.667,8.226l-24.727,38.398L92.839,64.42L0,256.087l42.289,36.399 l-22.328,34.553c-7.052,10.914-9.432,23.92-6.701,36.624c2.73,12.704,10.245,23.583,21.158,30.635 c7.963,5.146,17.042,7.804,26.304,7.804c2.438,0,4.887-0.193,7.333-0.565c3.097,11.013,10.047,20.988,20.388,27.67 c8.142,5.262,17.282,7.774,26.323,7.774c2.442,0,4.873-0.206,7.278-0.567c3.198,11.44,10.36,21.2,20.423,27.703 c8.143,5.262,17.282,7.774,26.323,7.774c15.973,0,31.639-7.845,40.934-22.231l6.634-10.268l38.853,25.758l0.162,0.107 c7.963,5.146,17.042,7.805,26.304,7.805c3.43,0,6.887-0.365,10.32-1.102c12.704-2.731,23.583-10.246,30.635-21.158 c4.963-7.681,7.476-16.249,7.745-24.785c2.489-0.146,4.985-0.478,7.47-1.012c12.704-2.731,23.583-10.246,30.635-21.158 c4.865-7.528,7.504-16.054,7.777-24.787c2.479-0.147,4.963-0.478,7.436-1.01c12.705-2.731,23.584-10.244,30.636-21.158 c4.968-7.688,7.481-16.267,7.745-24.811c14.973-0.869,29.358-8.609,38.102-22.144c7.052-10.914,9.432-23.92,6.703-36.624 C464.938,264.277,460.578,256.165,454.313,249.708z M223.819,79.562l213.947-6.856l36.06,121.529l-47.959,35.513L242.472,110.338 l-52.058,79.011l-0.08,0.123c-4.694,7.26-14.416,9.349-21.676,4.66c-7.26-4.691-9.35-14.415-4.645-21.697L223.819,79.562z M73.986,361.949c-4.694,7.261-14.418,9.35-21.675,4.66c-3.517-2.273-5.939-5.779-6.819-9.873 c-0.879-4.094-0.113-8.285,2.161-11.802l32.971-51.027c2.997-4.637,8.043-7.164,13.192-7.164c2.913,0,5.86,0.81,8.484,2.505 c3.517,2.273,5.938,5.778,6.818,9.872s0.113,8.286-2.159,11.803L73.986,361.949z M128.011,396.858 c-4.694,7.26-14.417,9.348-21.676,4.659c-7.26-4.691-9.35-14.415-4.658-21.675l32.972-51.027 c2.997-4.637,8.043-7.164,13.192-7.164c2.913,0,5.86,0.81,8.484,2.506c7.26,4.691,9.35,14.415,4.659,21.675L128.011,396.858z M215.006,380.74l-32.972,51.027c-4.691,7.262-14.415,9.349-21.674,4.659c-3.517-2.273-5.939-5.779-6.818-9.873 c-0.88-4.094-0.114-8.285,2.159-11.803l32.972-51.027c2.273-3.517,5.778-5.938,9.872-6.818c1.107-0.237,2.22-0.355,3.324-0.355 c2.985,0,5.911,0.857,8.477,2.516C217.607,363.757,219.697,373.48,215.006,380.74z M432.488,292.041 c-2.273,3.517-5.778,5.938-9.872,6.818c-4.094,0.881-8.286,0.113-11.802-2.159l-10.939-7.068l-0.001-0.001l-51.028-32.972 l-17.892,27.69l10.94,7.07l40.088,25.904c3.517,2.273,5.938,5.778,6.818,9.872s0.113,8.286-2.159,11.803s-5.779,5.939-9.872,6.819 c-4.095,0.879-8.285,0.113-11.803-2.159l-51.027-32.972l-17.892,27.69l40.087,25.902c7.26,4.691,9.35,14.414,4.659,21.675 c-2.273,3.517-5.779,5.939-9.872,6.819c-4.095,0.879-8.285,0.113-11.802-2.159l-43.558-28.145l-17.892,27.69l32.617,21.076 c7.26,4.693,9.351,14.415,4.659,21.676c-2.273,3.517-5.778,5.939-9.872,6.819c-4.068,0.874-8.232,0.122-11.735-2.117 l-39.081-25.909l8.443-13.068c14.557-22.529,8.072-52.702-14.457-67.258c-10.349-6.687-22.309-8.922-33.629-7.214 c-3.094-11.023-10.046-21.008-20.394-27.695c-10.342-6.682-22.292-8.919-33.605-7.217c-3.199-11.436-10.36-21.192-20.42-27.692 c-18.62-12.034-42.458-9.676-58.391,4.224l-21.076-18.14l70.215-144.958l50.897,12.241l-25.527,39.639 c-14.557,22.529-8.072,52.701,14.457,67.258c22.506,14.544,52.642,8.083,67.217-14.392l33.979-51.572l175.87,114.508 c3.516,2.273,5.938,5.778,6.818,9.872C435.528,284.332,434.761,288.523,432.488,292.041z"></path> </g> </g> </g></svg>
)
export default OwnerIcon