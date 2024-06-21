import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { currencyFormat } from '../../app/utils/utils';
import { useStoreContext } from '../../app/context/StoreContext';

export default function BasketSummary() {
  const { basket } = useStoreContext();
  const standardDeliveryFee = 500;
  const subtotal =
    basket?.items.reduce((sum, item) => sum + item.price * item.quantity, 0) ??
    0;
  const deliveryFee = subtotal > 10000 ? 0 : standardDeliveryFee;
  const total = deliveryFee + subtotal;
  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <b>Subtotal</b>
            </TableCell>
            <TableCell>{currencyFormat(subtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Delivery fee*</b>
            </TableCell>
            <TableCell>{currencyFormat(deliveryFee)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Total</b>
            </TableCell>
            <TableCell>{currencyFormat(total)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>
              <Typography
                sx={{ fontSize: '12px', fontWeight: '500' }}
                color='primary'
                fontStyle='italic'
              >
                Orders above $100 qualify for free delivery
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
