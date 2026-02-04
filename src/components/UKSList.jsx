const UKSList = ({ u, i = 0, setFormData, setUser }) => {
  let clicked = false;
  const colorName = `text-capitalize ${u.cardSettled ? "text-success" : "text-primary"}`;
  const doubleClick = () => {
    clicked = true;
    console.log("Double Click");
    setFormData(u);
    setUser(null);
  };

  const singleClick = () => {
    setTimeout(() => {
      console.log("Single Click");
      if (!clicked) {
        setUser(u);
        setFormData({});
      }
    }, 200);
  };

  return (
    <tr role="button" onDoubleClick={doubleClick} onClick={singleClick}>
      <td>{i + 1}</td>
      <td>{u?.cardNumber || ""}</td>
      <td className={colorName}>{u?.name || ""}</td>
      <td>{u?.ukstks || ""}</td>
      <td>{u?.phone || ""}</td>
      <td align="center">{u.completed ? "Yes" : ""}</td>
      <td align="center">{u.cardPrinted ? "Yes" : ""}</td>
      <td align="center">{u.cardSettled ? "Yes" : ""}</td>
      <td align="center">
        <img
          role="button"
          onClick={doubleClick}
          src="../../public/edit.png"
          alt="edit"
          width={25}
        />
      </td>
    </tr>
  );
};

export default UKSList;
